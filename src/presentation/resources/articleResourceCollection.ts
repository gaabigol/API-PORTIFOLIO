import { Article } from '../../domain/entities/Article'
import { ResourceCollection } from '../../shared/http/resources/resourceCollection'
import { IHypermediaLink } from '../../types/resources/IHypermediaLink '
import { ArticleResource } from './articleResource'
import { Request } from 'express'

export class ArticleResourceCollection extends ResourceCollection {
    constructor(
        protected data: Article[],
        protected request: Request,
        protected meta?: {
            paginationData?: { total: number; page: number; limit: number }
            links?: { [key: string]: IHypermediaLink }
            [key: string]: any
        }
    ) {
        super(data, meta)
    }

    public toJson(): any {
        const defaultLinks = {
            self: {
                href: this.request.originalUrl,
                method: 'GET',
                type: 'application/json',
            },
            ...(this.meta?.paginationData && {

                ...(this.meta?.paginationData.page *
                    this.meta?.paginationData.limit <
                    this.meta?.paginationData.total && {
                    next: {
                        href:
                            this.request?.originalUrl +
                            `?page=${this.meta?.paginationData.page + 1}`,
                        method: 'GET',
                    },
                }),
                //conditionally for prev
                ...(this.meta?.paginationData.page > 1 && {
                    prev: {
                        href:
                            this.request?.originalUrl +
                            `?page=${this.meta?.paginationData.page - 1}`,
                        method: 'GET',
                    },
                }),
                last: {
                    href:
                        this.request?.originalUrl +
                        `?page=${Math.ceil(
                            this.meta?.paginationData.total /
                                this.meta?.paginationData.limit
                        )}`,
                    method: 'GET',
                },
            }),
        }

        const { _meta: defaultMeta } = super.toJson()
        const { paginationData, ...otherMeta } = this.meta || {}

        const meta = {
            ...defaultMeta,
            ...otherMeta,
        }

        return {
            data: this.data.map((product) => {
                const resource = new ArticleResource(product, this.request)
                const { data, _meta } = resource.toJson()
                return {
                    ...data,
                    _meta,
                }
            }),
            _meta: {
                ...meta,
                _links: {
                    ...defaultLinks,
                    ...this.meta?.links,
                },
            },
        }
    }
}
