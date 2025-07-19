import { HttpError } from './httpError'

export class ForbiddenException extends HttpError {
    constructor(message = 'Forbidden') {
        super(403, message, 'ForbiddenException')
    }
}
