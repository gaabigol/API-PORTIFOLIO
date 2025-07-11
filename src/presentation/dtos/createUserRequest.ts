import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserRequest {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(6, 20)
    password: string


    constructor(data: any) {
        this.name = data.name
        this.email = data.email
        this.password = data.password
    }
}
