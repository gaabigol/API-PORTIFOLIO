import { inject, injectable } from 'inversify'
import TYPES from '../../container/types'
import { IArticleRepository } from '../../domain/repositories/IArticleRepository'
import { Article } from '../../domain/entities/Article'
import { NotFoundException } from '../../shared/http/exceptions/notFoundException'

@injectable()
export class GetSingleArticleUseCase {
    constructor(
        @inject(TYPES.IArticleRepository)
        private readonly repo: IArticleRepository
    ) {}

    public async execute(slug: string): Promise<Article> {
        const article = await this.repo.findBySlug(slug)
        if (!article)
            throw new NotFoundException(`Article with slug ${slug} not found`)
        return article
    }
}
