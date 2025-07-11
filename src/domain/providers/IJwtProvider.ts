export interface IJwtProvider {
    sign(payload: object): Promise<string>
    verify(token: string): Promise<{
        sub: string
        name: string
        email: string
        iat: number
        exp: number
    } | null>
}
