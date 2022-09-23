import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }
    async getUsers(): Promise<User[]> {
        return this.userRepository.find()
    }
    async getUserByEmail(email: string): Promise<User> {
        return this.userRepository.getUserByEmail(email)
    }

    async createUser(user: CreateUserDto): Promise<User> {
        return this.userRepository.create(user)
    }

    generateToken() {

    }
}
