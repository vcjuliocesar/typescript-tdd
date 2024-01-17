import { createUserDto } from "src/infrastructure/dtos/user.dto";
import { UserRepository } from "src/infrastructure/repositories/user.repository";

export class UserService{
    
    constructor(private repository:UserRepository){}

    async create(user:createUserDto){

        const newUser =  {...user}
        return await this.repository.create(newUser)
    }
}