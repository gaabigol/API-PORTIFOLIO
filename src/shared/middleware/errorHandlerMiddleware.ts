import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../http/exceptions/httpError'

export class ErrorHandlerMiddleware {
    public static async handle(
        error: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json(error.toJSON())
        }

        return res.status(500).json({
            statusCode: 500,
            message: 'An unexpected error occurred',
            title: 'Internal Server Error',
        })
    }
}
