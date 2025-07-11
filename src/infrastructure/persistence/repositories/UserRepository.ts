import { injectable } from 'inversify'
import { Repository } from 'typeorm'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import { User } from '../../../domain/entities/User'
import { UserEntity } from '../../entities/UserEntity'
import { AppDataSource } from '../typeorm/dataSource'

@injectable()
export class UserRepository implements IUserRepository {
    private repo: Repository<UserEntity>

    constructor() {
        this.repo = AppDataSource.getRepository(UserEntity)
    }

    async findAll(): Promise<User[]> {
        const users = await this.repo.find()
        return users.map((u) => new User(u.id, u.name, u.email, ''))
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.repo.findOneBy({ id })
        return user ? new User(user.id, user.name, user.email, '') : null
    }

    async create(data: Omit<User, 'id'>): Promise<User> {
        const newUser = this.repo.create(data)
        const saved = await this.repo.save(newUser)
        return new User(saved.id, saved.name, saved.email, '')
    }

    async verifyEmail(email: string): Promise<User | null> {
        const user = await this.repo.findOne({ where: { email } })
        return user
            ? new User(user.id, user.name, user.email, user.password)
            : null
    }
}
