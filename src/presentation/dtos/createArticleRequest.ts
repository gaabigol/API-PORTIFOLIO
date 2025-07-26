import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateArticleRequest {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    titleEn: string

    @IsString()
    @IsNotEmpty()
    excerpt: string

    @IsString()
    @IsOptional()
    excerptEn: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsString()
    @IsOptional()
    contentEn: string

    @IsString()
    tags: string

    @IsString()
    @IsOptional()
    tagsEn: string

    @IsString()
    category: string

    @IsString()
    @IsOptional()
    categoryEn: string

    @IsString()
    readTime: string

    constructor(data: any) {
        this.title = data.title
        this.titleEn = data.titleEn
        this.excerpt = data.excerpt
        this.excerptEn = data.excerptEn
        this.content = data.content
        this.contentEn = data.contentEn
        this.tags = data.tags || ''
        this.tagsEn = data.tagsEn || ''
        this.category = data.category || ''
        this.categoryEn = data.categoryEn || ''
        this.readTime = data.readTime || ''
    }
}
