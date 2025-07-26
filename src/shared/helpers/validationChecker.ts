import { validateSync } from 'class-validator'
import { NextFunction } from 'express'
import { UnprocessableEntityException } from '../http/exceptions/unprocessableEntityException'

export class ValidationChecker {
    static async validate(
        dto: object,
        next: NextFunction
    ): Promise<NextFunction | void> {
        const errors = validateSync(dto)
        if (errors.length > 0) {
            throw new UnprocessableEntityException(
                'Unprocessable Entity',
                errors
            )
        }
    }
}
