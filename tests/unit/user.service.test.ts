import { faker } from '@faker-js/faker'
import { PrismaSingleton } from '../../src/infrastructure/configs/database'
import { UserService } from '../../src/service/user.service'
import { createUserDto } from '../../src/infrastructure/dtos/user.dto'
import { UserRepository } from '../../src/infrastructure/repositories/user.repository'
import { User } from '../../src/domain/user.model';
import { UserAlreadyExistsException } from '../../src/infrastructure/handlers/exceptions/user-already-exists-exception'


const db = PrismaSingleton.getInstance()
const repository = new UserRepository(db)
const service = new UserService(repository)
let userPersist: { id: number; email: string; name: string; phone: string } 

describe('UserService', () => {

    beforeEach(async () => {
        await db.user.deleteMany({})
        userPersist = await db.user.create({
            data:{
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            }
        })
    })

    // afterAll(async () => {
    //     await db.$disconnect()
    // })

    describe('create function', () => {
        it('return an exception if user already exists',() => {
          expect(async ()=>{
            const testUser: createUserDto = {
                 name: userPersist.name,
                 email: userPersist.email,
                 phone: userPersist.phone
             }
             await service.create(testUser)
          }).toThrow(UserAlreadyExistsException)  
        })
      
    })

    afterAll(async () => {
        await db.user.deleteMany({})
        await db.$disconnect()
    })
})


  // it('create a user', async () => {
        //     const testUser: createUserDto = {
        //         name: faker.person.fullName(),
        //         email: faker.internet.email(),
        //         phone: faker.phone.number()
        //     }

        //     await service.create(testUser)

        //     expect(testUser).toEqual({
        //         name: testUser.name,
        //         email: testUser.email,
        //         phone: testUser.phone
        //     })

        //     const userInDatabase = await db.user.findUnique({
        //         where: {
        //             email: testUser?.email
        //         },
        //     })
            
        //     expect(userInDatabase).toMatchObject(testUser);

        // })