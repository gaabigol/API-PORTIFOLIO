const TYPES = {
    IUserRepository: Symbol.for('IUserRepository'),
    CreateUserUseCase: Symbol.for('CreateUserUseCase'),
    UserController: Symbol.for('UserController'),
    IHashProvider: Symbol.for('IHashProvider'),
    IJwtProvider: Symbol.for('IJwtProvider'),
    AuthUsecase: Symbol.for('AuthUsecase'),
    AuthMiddleware: Symbol.for('AuthMiddleware'),
    GetUserUseCase: Symbol.for('GetUserUseCase'),
    AuthController: Symbol.for('AuthController'),
    IArticleRepository: Symbol.for('IArticleRepository'),
    GetArticleUseCase: Symbol.for('GetArticleUseCase'),
    GetSingleArticleUseCase: Symbol.for('GetSingleArticleUseCase'),
    ArticleController: Symbol.for('ArticleController'),
    CreateArticleUseCase: Symbol.for('CreateArticleUseCase'),
    UpdateArticleUseCase: Symbol.for('UpdateArticleUseCase'),
    DeleteArticleUseCase: Symbol.for('DeleteArticleUseCase'),
}
export default TYPES
