import { injectable } from 'inversify'
import { Repository } from 'typeorm'
import { AppDataSource } from '../typeorm/dataSource'
import { IArticleRepository } from '../../../domain/repositories/IArticleRepository'
import { ArticleEntity } from '../../entities/ArticleEntity'
import { Article } from '../../../domain/entities/Article'

@injectable()
export class ArticleRepository implements IArticleRepository {
    private repo: Repository<ArticleEntity>

    constructor() {
        this.repo = AppDataSource.getRepository(ArticleEntity)
    }

    async findAll(
        data: {
            page: number
            limit: number
            filter?: { name?: string }
        } = { page: 1, limit: 10 }
    ): Promise<{ articles: Article[]; total: number }> {
        const { page, limit } = data
        const [articles, total] = await this.repo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        })
        return { articles, total }
    }

    async findBySlug(slug: string): Promise<Article | null> {
        return this.repo.findOneBy({
            uuid: slug,
        })
    }
}
