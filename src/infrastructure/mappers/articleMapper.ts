import { Article } from '../../domain/entities/Article'
import { ArticleEntity } from '../entities/ArticleEntity'

export class ArticleMapper {
    public static toDomain(articleEntity: ArticleEntity): Article {
        return new Article(
            articleEntity.id,
            articleEntity.uuid,
            articleEntity.title,
            articleEntity.titleEn,
            articleEntity.excerpt,
            articleEntity.excerptEn,
            articleEntity.content,
            articleEntity.contentEn,
            articleEntity.tags,
            articleEntity.tagsEn,
            articleEntity.category,
            articleEntity.categoryEn,
            articleEntity.readTime || '',
            articleEntity.published,
            articleEntity.createdAt,
            articleEntity.updatedAt
        )
    }

    public static toEntity(article: Article): ArticleEntity {
        const articleEntity = new ArticleEntity()
        articleEntity.id = article.id
        articleEntity.uuid = article.uuid
        articleEntity.title = article.title
        articleEntity.titleEn = article.titleEn
        articleEntity.excerpt = article.excerpt
        articleEntity.excerptEn = article.excerptEn
        articleEntity.content = article.content
        articleEntity.contentEn = article.contentEn
        articleEntity.tags = article.tags
        articleEntity.tagsEn = article.tagsEn
        articleEntity.category = article.category
        articleEntity.categoryEn = article.categoryEn
        articleEntity.readTime = article.readTime || ''
        articleEntity.published = article.published

        return articleEntity
    }

    public static toDomainArray(entities: ArticleEntity[]): Article[] {
        return entities.map((entity) => this.toDomain(entity))
    }

    public static toEntityArray(domains: Article[]): Partial<ArticleEntity>[] {
        return domains.map((domain) => this.toEntity(domain))
    }

    public static mergeEntityUpdate(
        existing: ArticleEntity,
        updates: Partial<Article>
    ): Partial<ArticleEntity> {
        const entityUpdates = this.toEntity(updates as Article)
        return {
            ...existing,
            ...entityUpdates,
            id: existing.id,
            createdAt: existing.createdAt,
            updatedAt: new Date(),
        }
    }
}
