import { IHypermediaLink } from '../../../types/resources/IHypermediaLink '
import { IResource } from '../../../types/resources/IResource'

export class Resource implements IResource {
    constructor(
        protected data: any,
        protected meta?: {
            links?: { [key: string]: IHypermediaLink }
            [key: string]: any
        }
    ) {}

    toJson() {
        const { links, ...otherMeta } = this.meta || {}

        return {
            data: this.data,
            _meta: {
                ...otherMeta,
                ...(links && { _links: links }),
            },
        }
    }
}
