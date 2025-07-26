import { inject, injectable } from 'inversify'
import TYPES from '../../container/types'
import { IArticleRepository } from '../../domain/repositories/IArticleRepository'
import { UpdateArticleRequest } from '../../presentation/dtos/updateArticleRequest'
import { NotFoundException } from '../../shared/http/exceptions/notFoundException'
import { Article } from '../../domain/entities/Article'

@injectable()
export class UpdateArticleUseCase {
    constructor(
        @inject(TYPES.IArticleRepository)
        private readonly repo: IArticleRepository
    ) {}

    public async execute(
        slug: string,
        data: UpdateArticleRequest
    ): Promise<Article> {
        const article = await this.repo.findBySlug(slug)
        if (!article) throw new NotFoundException('Article not found')
        const updatedArticle = await this.repo.update(article, data)
        return updatedArticle
    }
}
