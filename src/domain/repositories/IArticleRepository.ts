import { Article } from '../entities/Article'

export interface IArticleRepository {
    findAll(data: {
        page: number
        limit: number
        filter?: { name?: string; categories_slug: string[] }
    }): Promise<{ articles: Article[]; total: number }>
    findBySlug(slug: string): Promise<Article | null>
}
