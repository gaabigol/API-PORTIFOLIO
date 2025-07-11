import { NextFunction, Request, Response } from 'express'
import { UnauthorizedException } from '../http/exceptions/unauthorizedException'
import { IJwtProvider } from '../../domain/providers/IJwtProvider'
import TYPES from '../../container/types'
import { inject } from 'inversify'
import { GetUserUseCase } from '../../usecases/user/getUserUseCase'
import { User } from '../../domain/entities/User'
import { AuthenticatedRequest } from '../../types/http/authenticatedRequest'

export class AuthMiddleware {
    constructor(
        @inject(TYPES.IJwtProvider)
        private readonly jwtService: IJwtProvider,
        @inject(TYPES.GetUserUseCase)
        private readonly getUserUseCase: GetUserUseCase
    ) {}

    private readonly protectedRoutes = ['/user']
    public async authenticate(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        const isProtectedRoute = this.protectedRoutes.some((route) =>
            req.url.startsWith(route)
        )

        if (!isProtectedRoute) return next()

        const accessToken =
            req.headers.authorization?.replace('Bearer ', '') ||
            req.cookies?.accessToken

        if (!accessToken) {
            return next(new UnauthorizedException('Access token is missing'))
        }

        try {
            const payload = await this.jwtService.verify(accessToken)
            if (!payload) {
                return next(new UnauthorizedException('Invalid access token'))
            }

            const user = await this.getUserUseCase.execute(+payload.sub)
            req.user = {
                id: user.id,
                name: user.name,
                email: user.email,
            } as Partial<User>
            return next()
        } catch (error) {
            return next(new UnauthorizedException('Invalid access token'))
        }
    }
}
