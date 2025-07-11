import { Request } from 'express'
import { User } from '../domain/entities/User'

declare module 'express-serve-static-core' {
    interface Request {
        user?: Partial<User>
    }
}
