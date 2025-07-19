import { Type } from 'class-transformer'
import { IsInt, IsOptional, Min } from 'class-validator'

export class GetArticleRequest {
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'page deve ser um número inteiro' })
    @Min(1, { message: 'page deve ser no mínimo 1' })
    page?: number = 1

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'limit deve ser um número inteiro' })
    @Min(1, { message: 'limit deve ser no mínimo 1' })
    limit?: number = 10

    constructor(data: any) {
        this.page = data.page || 1
        this.limit = data.limit || 10
    }
}
