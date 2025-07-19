import { IsNotEmpty, IsString } from 'class-validator'

export class GetSingleArticleRequest {
    @IsNotEmpty({ message: 'slug é obrigatório' })
    @IsString()
    slug: string

    constructor(data: any) {
        this.slug = data.slug || ''
    }
}
