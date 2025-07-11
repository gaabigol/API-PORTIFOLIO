import { HttpError } from './httpError'

export class UnauthorizedException extends HttpError {
    constructor(message = 'Unauthorized') {
        super(401, message, 'UnauthorizedException')
    }
}
