import { User } from '../../domain/entities/User'
import { Request } from 'express'
export interface AuthenticatedRequest extends Request {
    user?: Partial<User>
}
