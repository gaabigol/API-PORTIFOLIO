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
import { IArticleRepository } from '../domain/repositories/IArticleRepository'
import { ArticleRepository } from '../infrastructure/persistence/repositories/ArticleRepository'
import { GetArticleUseCase } from '../usecases/article/getArticleUsecase'
import { GetSingleArticleUseCase } from '../usecases/article/getSingleArticleUsecase'
import { ArticleController } from '../presentation/controllers/articleController'
import { CreateArticleUseCase } from '../usecases/article/createArticleUsecase'
import { UpdateArticleUseCase } from '../usecases/article/updateArticleUsecase'
import { DeleteArticleUseCase } from '../usecases/article/deleteArticleUsecase'

const container = new Container()

// providers
container.bind<IHashProvider>(TYPES.IHashProvider).to(BcryptHashProvider)
container.bind<IJwtProvider>(TYPES.IJwtProvider).to(JwtProvider)

// middlewares
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)

// controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController)
container.bind<UserController>(TYPES.UserController).to(UserController)

// use cases
container.bind<AuthUsecase>(TYPES.AuthUsecase).to(AuthUsecase)
container
    .bind<GetSingleArticleUseCase>(TYPES.GetSingleArticleUseCase)
    .to(GetSingleArticleUseCase)
container.bind<ArticleController>(TYPES.ArticleController).to(ArticleController)
container.bind<GetUserUseCase>(TYPES.GetUserUseCase).to(GetUserUseCase)
container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase)
container.bind<GetArticleUseCase>(TYPES.GetArticleUseCase).to(GetArticleUseCase)
container
    .bind<CreateArticleUseCase>(TYPES.CreateArticleUseCase)
    .to(CreateArticleUseCase)
container.bind<UpdateArticleUseCase>(TYPES.UpdateArticleUseCase).to(UpdateArticleUseCase)
container
    .bind<DeleteArticleUseCase>(TYPES.DeleteArticleUseCase)
    .to(DeleteArticleUseCase)

// repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository)
container
    .bind<IArticleRepository>(TYPES.IArticleRepository)
    .to(ArticleRepository)

export { container }
