import { inject, injectable } from 'inversify'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { User } from '../../domain/entities/User'
import TYPES from '../../container/types'
import { NotFoundException } from '../../shared/http/exceptions/notFoundException'

@injectable()
export class GetUserUseCase {
    constructor(
        @inject(TYPES.IUserRepository)
        private readonly userRepo: IUserRepository
    ) {}

    async execute(id: number): Promise<Partial<User>> {
        const user = await this.userRepo.findById(id)
        if (!user) throw new NotFoundException('User not found')
        return user
    }
}
