import { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { BadRequestException } from '../http/exceptions/badRequestException'
import { ForbiddenException } from '../http/exceptions/forbiddenException'

interface CorsConfig {
    allowedOrigins: string[]
    allowedMethods: string[]
    allowedHeaders: string[]
    exposedHeaders?: string[]
    maxAge?: number
    credentials: boolean
    preflightContinue: boolean
    optionsSuccessStatus: number
}

export class CorsMiddleware {
    private readonly config: CorsConfig
    private readonly originRegexPatterns: RegExp[]

    constructor(config?: Partial<CorsConfig>) {
        this.config = {
            allowedOrigins: [
                'http://localhost:3000',
                'http://localhost:3001',
                'https://my-portfolio.com',
                'https://www.my-portfolio.com',
            ],
            allowedMethods: [
                'GET',
                'POST',
                'PUT',
                'PATCH',
                'DELETE',
                'OPTIONS',
            ],
            allowedHeaders: [
                'Content-Type',
                'Authorization',
                'X-Requested-With',
                'Accept',
                'Origin',
                'Cache-Control',
                'X-File-Name',
            ],
            exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
            maxAge: 86400, // 24 horas
            credentials: true,
            preflightContinue: false,
            optionsSuccessStatus: 204,
            ...config,
        }

        this.originRegexPatterns = this.compileOriginPatterns()
    }

    private compileOriginPatterns(): RegExp[] {
        const patterns: RegExp[] = []
        patterns.push(/^https:\/\/.*\.my-portfolio\.com$/)
        if (process.env.NODE_ENV === 'development') {
            patterns.push(/^http:\/\/localhost:\d{4}$/)
            patterns.push(/^http:\/\/127\.0\.0\.1:\d{4}$/)
        }

        return patterns
    }

    private isOriginAllowed(origin: string): boolean {
        if (this.config.allowedOrigins.includes(origin)) {
            return true
        }
        return this.originRegexPatterns.some((pattern) => pattern.test(origin))
    }

    private validateOrigin(origin: string | undefined): string {
        if (!origin) {
            throw new BadRequestException('Origin header is required')
        }

        try {
            const url = new URL(origin)

            if (!['http:', 'https:'].includes(url.protocol)) {
                throw new ForbiddenException('Invalid origin protocol')
            }
            if (
                origin.includes('<') ||
                origin.includes('>') ||
                origin.includes('"')
            ) {
                throw new ForbiddenException('Invalid origin format')
            }
        } catch (error) {
            throw new BadRequestException('Invalid origin format')
        }

        return origin
    }
    private createCorsOptions(origin: string): cors.CorsOptions {
        return {
            origin: origin,
            methods: this.config.allowedMethods,
            allowedHeaders: this.config.allowedHeaders,
            exposedHeaders: this.config.exposedHeaders,
            credentials: this.config.credentials,
            maxAge: this.config.maxAge,
            preflightContinue: this.config.preflightContinue,
            optionsSuccessStatus: this.config.optionsSuccessStatus,
        }
    }

    private handlePreflightRequest(
        req: Request,
        res: Response,
        next: NextFunction,
        origin: string
    ): void {
        const corsOptions = this.createCorsOptions(origin)
        cors(corsOptions)(req, res, (err) => {
            if (err) {
                return next(err)
            }
            res.header('Vary', 'Origin, Access-Control-Request-Headers')
            res.status(this.config.optionsSuccessStatus).end()
        })
    }

    private handleNormalRequest(
        req: Request,
        res: Response,
        next: NextFunction,
        origin: string
    ): void {
        const corsOptions = this.createCorsOptions(origin)

        cors(corsOptions)(req, res, (err) => {
            if (err) {
                return next(err)
            }

            res.header('Vary', 'Origin')
            next()
        })
    }

    public async handle(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const rawOrigin = req.headers.origin
            const origin = this.validateOrigin(rawOrigin)

            if (!this.isOriginAllowed(origin)) {
                return next(
                    new ForbiddenException(
                        `Origin '${origin}' not allowed by CORS policy`
                    )
                )
            }

            if (req.method === 'OPTIONS') {
                this.handlePreflightRequest(req, res, next, origin)
                return
            }
            this.handleNormalRequest(req, res, next, origin)
        } catch (error) {
            next(error)
        }
    }

    public static create(config?: Partial<CorsConfig>): CorsMiddleware {
        return new CorsMiddleware(config)
    }
}
