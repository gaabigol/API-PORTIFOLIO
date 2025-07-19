import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import TYPES from '../../container/types'
import { ValidationChecker } from '../../shared/helpers/validationChecker'
import { GetArticleUseCase } from '../../usecases/article/getArticleUsecase'
import { GetArticleRequest } from '../dtos/getArticleRequest'
import { ArticleResource } from '../resources/articleResource'
import { ArticleResourceCollection } from '../resources/articleResourceCollection'
import { GetSingleArticleRequest } from '../dtos/getSingleArticleRequest'
import { GetSingleArticleUseCase } from '../../usecases/article/getSingleArticleUsecase'

@injectable()
export class ArticleController {
    constructor(
        @inject(TYPES.CreateUserUseCase)
        private readonly GetArticleUseCase: GetArticleUseCase,
        @inject(TYPES.GetSingleArticleUseCase)
        private readonly GetSingleArticleUseCase: GetSingleArticleUseCase
    ) {}

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const validator = new GetArticleRequest(req.body)
            await ValidationChecker.validate(validator, next)
            const { articles, total } = await this.GetArticleUseCase.execute({
                page: validator.page || 1,
                limit: validator.limit || 10,
            })
            const resource = new ArticleResourceCollection(articles, req, {
                paginationData: {
                    total,
                    page: validator.page || 1,
                    limit: validator.limit || 10,
                },
            })
            return res.status(200).json(resource.toJson())
        } catch (error) {
            next(error)
        }
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const validator = new GetSingleArticleRequest(req.params)
            await ValidationChecker.validate(validator, next)
            const article = await this.GetSingleArticleUseCase.execute(
                validator.slug
            )
            const resource = new ArticleResource(article, req)
            return res.status(200).json(resource.toJson())
        } catch (error) {
            next(error)
        }
    }
}
