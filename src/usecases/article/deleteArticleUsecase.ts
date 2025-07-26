import { inject, injectable } from 'inversify'
import TYPES from '../../container/types'
import { IArticleRepository } from '../../domain/repositories/IArticleRepository'
import { NotFoundException } from '../../shared/http/exceptions/notFoundException'


@injectable()
export class DeleteArticleUseCase {
    constructor(
        @inject(TYPES.IArticleRepository)
        private readonly repo: IArticleRepository
    ) {}

    public async execute(slug: string): Promise<void> {
        const article = await this.repo.findBySlug(slug)
        if (!article) throw new NotFoundException('Article not found')
        await this.repo.delete(article.uuid)
    }
}
