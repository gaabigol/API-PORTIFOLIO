import { ValidationError } from 'class-validator'

export class ValidateRequestError extends Error {
    constructor(readonly error: ValidationError[]) {
        super()
        this.name = 'validateRequestError'
    }
}
