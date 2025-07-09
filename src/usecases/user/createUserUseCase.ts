import { inject, injectable } from 'inversify'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { User } from '../../domain/entities/User'
import TYPES from '../../container/types'

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject(TYPES.IUserRepository)
        private readonly userRepo: IUserRepository
    ) {}

    async execute(data: Omit<User, 'id'>): Promise<User> {
        return this.userRepo.create(data)
    }
}
