import { PrismaClient } from '@prisma/client'
import {createUserDto} from 'src/infrastructure/dtos/user.dto'
import { PrismaSingleton } from '../configs/database'


export class UserRepository{
    
    constructor(private db:PrismaClient = PrismaSingleton.getInstance()){}

    async create(user:createUserDto){
        const newUser = await this.db.user.create({
            data:user
        }).then(async()=>{
            await this.db.$disconnect()
        }).catch(async (e) => {
            console.error(e)
            await this.db.$disconnect()
            process.exit(1)
        })

        return newUser
    }
}