import { Container } from 'inversify'
import TYPES from './types'
import { IUserRepository } from '../domain/repositories/IUserRepository'
import { UserRepository } from '../infrastructure/persistence/repositories/UserRepository'
import { CreateUserUseCase } from '../usecases/user/createUserUseCase'
import { UserController } from '../presentation/controllers/userController'
import { IHashProvider } from '../domain/providers/IHashProvider'
import { BcryptHashProvider } from '../infrastructure/services/BcryptHashProvider'
import { IJwtProvider } from '../domain/providers/IJwtProvider'
import { JwtProvider } from '../infrastructure/services/JwtProvider'
import { AuthUsecase } from '../usecases/auth/authUsecase'
import { AuthMiddleware } from '../shared/middleware/authMiddleware'
import { GetUserUseCase } from '../usecases/user/getUserUseCase'
import { AuthController } from '../presentation/controllers/authController'

const container = new Container()

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository)
container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase)
container.bind<UserController>(TYPES.UserController).to(UserController)
container.bind<IHashProvider>(TYPES.IHashProvider).to(BcryptHashProvider)
container.bind<IJwtProvider>(TYPES.IJwtProvider).to(JwtProvider)
container.bind<AuthUsecase>(TYPES.AuthUsecase).to(AuthUsecase)
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
container.bind<GetUserUseCase>(TYPES.GetUserUseCase).to(GetUserUseCase)
container.bind<AuthController>(TYPES.AuthController).to(AuthController)


export { container }
