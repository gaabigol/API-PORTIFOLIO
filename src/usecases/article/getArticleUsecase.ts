import { inject, injectable } from 'inversify'
import TYPES from '../../container/types'
import { IArticleRepository } from '../../domain/repositories/IArticleRepository'
import { Article } from '../../domain/entities/Article'

@injectable()
export class GetArticleUseCase {
    constructor(
        @inject(TYPES.IArticleRepository)
        private readonly repo: IArticleRepository
    ) {}

    async execute(
        data: {
            page: number
            limit: number
            filter?: { name?: string; categories_slug: string[] }
        } = { page: 1, limit: 10 }
    ): Promise<{ articles: Article[]; total: number }> {
        const result = await this.repo.findAll(data)
        return result
    }
}
