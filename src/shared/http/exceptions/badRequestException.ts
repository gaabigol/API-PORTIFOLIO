import { HttpError } from './httpError'

export class BadRequestException extends HttpError {
    constructor(message = 'Bad Request') {
        super(400, message, 'badRequestException')
    }
}
