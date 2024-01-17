import { faker } from '@faker-js/faker'
import { PrismaSingleton } from '../../src/infrastructure/configs/database'
import { UserService } from '../../src/service/user.service'
import { createUserDto } from '../../src/infrastructure/dtos/user.dto'
import { UserRepository } from '../../src/infrastructure/repositories/user.repository'


const db = PrismaSingleton.getInstance()
const repository = new UserRepository(db)
const service = new UserService(repository)

describe('UserService', () => {

    beforeEach(async () => {
        await db.user.deleteMany({})
    })

    afterAll(async () => {
        await db.$disconnect()
    })

    describe('create function', () => {
        it('create a user', async () => {
            const user: createUserDto = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            }

            const store = await service.create(user)


            console.log("Store", store)

            expect(user).toEqual({
                name: user.name,
                email: user.email,
                phone: user.phone
            })

        })
    })

    afterAll(async () => {
        await db.user.deleteMany({})
        await db.$disconnect()
    })
})
