export class UserAlreadyExistsException extends Error {
    constructor(message:string = 'User already exists'){
        super(message)
        this.name = 'UserAlreadyExistsException'
    }
}