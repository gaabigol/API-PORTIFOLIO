import jwt from 'jsonwebtoken'
import { IJwtProvider } from '../../domain/providers/IJwtProvider'

export class JwtProvider implements IJwtProvider {
    async sign(payload: object): Promise<string> {
        return jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: '1d',
            algorithm: process.env.ALGHORITHM as jwt.Algorithm,
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER,
        })
    }
    async verify(token: string): Promise<{
        sub: string
        name: string
        email: string
        iat: number
        exp: number
    }> {
        return jwt.verify(token, process.env.JWT_SECRET as string, {
            algorithms: ['HS256'],
        }) as {
            sub: string
            name: string
            email: string
            iat: number
            exp: number
        }
    }
}
