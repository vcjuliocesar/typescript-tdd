import {User} from '../../domain/user.model'

export interface createUserDto extends Omit<User,'id'> {}