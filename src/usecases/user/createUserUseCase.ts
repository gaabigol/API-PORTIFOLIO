import { inject, injectable } from 'inversify'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { User } from '../../domain/entities/User'
import TYPES from '../../container/types'
import { IHashProvider } from '../../domain/providers/IHashProvider'
import { ConflictException } from '../../shared/http/exceptions/conflictException'

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject(TYPES.IUserRepository)
        private readonly userRepo: IUserRepository,
        @inject(TYPES.IHashProvider)
        private readonly hashService: IHashProvider
    ) {}

    async execute(data: Omit<User, 'id'>): Promise<User> {
        const existingUser = await this.userRepo.verifyEmail(data.email)
        if (existingUser)
            throw new ConflictException('Already exists a user with this email')
        const hashedPassword = await this.hashService.hash(data.password)
        return this.userRepo.create({
            ...data,
            password: hashedPassword,
        })
    }
}
