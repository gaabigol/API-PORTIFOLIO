import { HttpError } from './httpError'

export class ConflictException extends HttpError {
    constructor(message = 'Conflict') {
        super(409, message, 'conflictException')
    }
}
