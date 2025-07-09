import { HttpError } from './httpError'

export class NotFoundException extends HttpError {
    constructor(message = 'Resource not found') {
        super(404, message, 'NotFoundException')
    }
}
