import { injectable } from 'inversify'
import { Repository } from 'typeorm'
import { AppDataSource } from '../typeorm/dataSource'
import { IArticleRepository } from '../../../domain/repositories/IArticleRepository'
import { ArticleEntity } from '../../entities/ArticleEntity'
import { Article } from '../../../domain/entities/Article'
import { ArticleMapper } from '../../mappers/articleMapper'


@injectable()
export class ArticleRepository implements IArticleRepository {
    private repo: Repository<ArticleEntity>

    constructor() {
        this.repo = AppDataSource.getRepository(ArticleEntity)
    }

    public async findAll(
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
        return {
            articles: ArticleMapper.toDomainArray(articles),
            total,
        }
    }

    public async findBySlug(slug: string): Promise<Article | null> {
        const article = await this.repo.findOneBy({
            uuid: slug,
        })
        return article ? ArticleMapper.toDomain(article) : null
    }

    public async create(data: Partial<Article>): Promise<Article> {
        const newArticle = this.repo.create(data)
        const saved = await this.repo.save(newArticle)
        return ArticleMapper.toDomain(saved)
    }

    public async update(
        article: Article,
        data: Partial<Article>
    ): Promise<Article> {
        Object.assign(article, data)
        const updatedArticle = await this.repo.save(article)
        return ArticleMapper.toDomain(updatedArticle)
    }

    public async delete(slug: string): Promise<void> {
        await this.repo.delete({ uuid: slug })
    }
}
