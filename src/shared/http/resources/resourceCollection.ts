import { IHypermediaLink } from '../../../types/resources/IHypermediaLink '
import { IResource } from '../../../types/resources/IResource'

export class ResourceCollection {
    constructor(
        protected data: any[],
        protected meta?: {
            paginationData?: { total: number; page: number; limit: number }
            links?: { [key: string]: IHypermediaLink }
            [key: string]: any
        }
    ) {}

    toJson() {
        const { paginationData, links, ...otherData } = this.meta || {}

        const meta = {
            ...otherData,
            //@ts-expect-error
            current_page: paginationData.page,
            //@ts-expect-error
            total: paginationData.total,
            //@ts-expect-error
            per_page: paginationData.limit,
        }

        return {
            data: this.data,
            _meta: {
                ...meta,
                ...(links && { _links: links }),
            },
        }
    }
}
