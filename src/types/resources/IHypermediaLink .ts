export interface IHypermediaLink {
    href: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    type?: string
}
