import { User } from '../entities/User'

export interface IUserRepository {
    findAll(): Promise<Partial<User[]>>
    findById(id: number): Promise<Partial<User> | null>
    create(user: Omit<User, 'id'>): Promise<User>
}
