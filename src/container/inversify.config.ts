import { Container } from 'inversify'
import TYPES from './types'
import { IUserRepository } from '../domain/repositories/IUserRepository'
import { UserRepository } from '../infrastructure/persistence/repositories/UserRepository'
import { CreateUserUseCase } from '../usecases/user/createUserUseCase'
import { UserController } from '../presentation/controllers/userController'

const container = new Container()

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository)
container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase)
container.bind<UserController>(TYPES.UserController).to(UserController) 

export { container }
