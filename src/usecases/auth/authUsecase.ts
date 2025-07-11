import { inject } from 'inversify'
import TYPES from '../../container/types'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { NotFoundException } from '../../shared/http/exceptions/notFoundException'
import { IJwtProvider } from '../../domain/providers/IJwtProvider'
import { IHashProvider } from '../../domain/providers/IHashProvider'
import { UnauthorizedException } from '../../shared/http/exceptions/unauthorizedException'

export class AuthUsecase {
    constructor(
        @inject(TYPES.IUserRepository)
        private readonly userRepo: IUserRepository,
        @inject(TYPES.IJwtProvider)
        private readonly jwtService: IJwtProvider,
        @inject(TYPES.IHashProvider)
        private readonly hashService: IHashProvider
    ) {}

    async execute(email: string, password: string) {
        const user = await this.userRepo.verifyEmail(email)
        if (!user) throw new NotFoundException('User not found')
        if (!(await this.hashService.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const token = await this.jwtService.sign({
            sub: user.id,
            email: user.email,
            name: user.name,
        })
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
        }
    }
}
