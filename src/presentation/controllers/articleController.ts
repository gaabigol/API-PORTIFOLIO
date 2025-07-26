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
import { CreateArticleUseCase } from '../../usecases/article/createArticleUsecase'
import { CreateArticleRequest } from '../dtos/createArticleRequest'
import { UpdateArticleUseCase } from '../../usecases/article/updateArticleUsecase'
import { DeleteArticleUseCase } from '../../usecases/article/deleteArticleUsecase'

@injectable()
export class ArticleController {
    constructor(
        @inject(TYPES.GetArticleUseCase)
        private readonly GetArticleUseCase: GetArticleUseCase,
        @inject(TYPES.GetSingleArticleUseCase)
        private readonly GetSingleArticleUseCase: GetSingleArticleUseCase,
        @inject(TYPES.CreateArticleUseCase)
        private readonly CreateArticleUseCase: CreateArticleUseCase,
        @inject(TYPES.UpdateArticleUseCase)
        private readonly UpdateArticleUseCase: UpdateArticleUseCase,
        @inject(TYPES.DeleteArticleUseCase)
        private readonly DeleteArticleUseCase: DeleteArticleUseCase
    ) {}

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const validator = new GetArticleRequest(req.query)

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
            //      res.set('Cache-control', 'max-age=20')
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

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const validator = new CreateArticleRequest(req.body)
            await ValidationChecker.validate(validator, next)
            const article = await this.CreateArticleUseCase.execute(validator)
            const resource = new ArticleResource(article, req)
            return res.status(201).json(resource.toJson())
        } catch (error) {
            next(error)
        }
    }
}
