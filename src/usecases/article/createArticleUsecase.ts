import { inject, injectable } from 'inversify'
import TYPES from '../../container/types'
import { IArticleRepository } from '../../domain/repositories/IArticleRepository'
import { CreateArticleRequest } from '../../presentation/dtos/createArticleRequest'
import { Article } from '../../domain/entities/Article'

@injectable()
export class CreateArticleUseCase {
    constructor(
        @inject(TYPES.IArticleRepository)
        private readonly repo: IArticleRepository
    ) {}

    public async execute(data: CreateArticleRequest) {
        return this.repo.create({
            title: data.title,
            titleEn: data.titleEn,
            excerpt: data.excerpt,
            excerptEn: data.excerptEn,
            content: data.content,
            contentEn: data.contentEn,
            tags: data.tags,
            tagsEn: data.tagsEn,
            category: data.category,
            categoryEn: data.categoryEn,
            readTime: data.readTime,
        })
    }
}
