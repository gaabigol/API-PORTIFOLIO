import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import TYPES from '../../container/types'
import { CreateUserUseCase } from '../../usecases/user/createUserUseCase'
import { CreateUserRequest } from '../dtos/createUserRequest'
import { ValidationChecker } from '../../shared/helpers/validationChecker'

@injectable()
export class UserController {
    constructor(
        @inject(TYPES.CreateUserUseCase)
        private readonly createUserUseCase: CreateUserUseCase
    ) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const validator = new CreateUserRequest(req.body)
            await ValidationChecker.validate(validator, next)
            const user = await this.createUserUseCase.execute(validator)
            return res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }
}
