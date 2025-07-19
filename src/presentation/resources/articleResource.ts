import { Article } from '../../domain/entities/Article'
import { Resource } from '../../shared/http/resources/resource'
import { IHypermediaLink } from '../../types/resources/IHypermediaLink '
import { Request } from 'express'

export class ArticleResource extends Resource {
    constructor(
        protected data: Article,
        protected request: Request,
        protected meta?: {
            links?: { [key: string]: IHypermediaLink }
            [key: string]: any
        }
    ) {
        super(data, meta)
    }
    public toJson(): any {
        const url = this.request.originalUrl.split('?')[0]
        const defaultLinks = {
            self: {
                href: url + '/' + this.data.id,
                method: 'GET',
                type: 'application/json',
            },
            update: {
                href: url + '/' + this.data.id,
                method: 'PATCH',
                type: 'application/json',
            },
            delete: {
                href: url + '/' + this.data.id,
                method: 'DELETE',
            },
        }

        const result = super.toJson()

        return {
            ...result,
            _meta: {
                ...result._meta,
                _links: {
                    ...result._meta._links,
                    ...defaultLinks,
                },
            },
        }
    }
}
