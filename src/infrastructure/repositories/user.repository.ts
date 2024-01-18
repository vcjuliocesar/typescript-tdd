import { PrismaClient } from '@prisma/client'
import {createUserDto} from 'src/infrastructure/dtos/user.dto'
import { PrismaSingleton } from '../configs/database'


export class UserRepository{
    
    constructor(private db:PrismaClient = PrismaSingleton.getInstance()){}

    async create(user:createUserDto){
        try {
            const newUser = await this.db.user.create({
                data:user
            })
            
            return newUser 
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }finally{
            await this.db.$disconnect()
        }
        
    }
}