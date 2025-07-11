import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import TYPES from '../../container/types'
import { CreateUserRequest } from '../dtos/createUserRequest'
import { ValidationChecker } from '../../shared/helpers/validationChecker'
import { AuthUsecase } from '../../usecases/auth/authUsecase'
import { AuthRequest } from '../dtos/authRequest'

@injectable()
export class AuthController {
    constructor(
        @inject(TYPES.AuthUsecase)
        private readonly authUsecase: AuthUsecase
    ) {}

    async auth(req: Request, res: Response, next: NextFunction) {
        try {
            const validator = new AuthRequest(req.body)
            await ValidationChecker.validate(validator, next)
            const auth = await this.authUsecase.execute(
                validator.email,
                validator.password
            )
            return res.status(200).json(auth)
        } catch (error) {
            next(error)
        }
    }
}
