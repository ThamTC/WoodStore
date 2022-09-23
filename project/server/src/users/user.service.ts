import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseData } from './interface/user.interface';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }
    async getUsers(): Promise<UserResponseData[]> {
        return await this.userRepository.find()
    }
    async getUserByEmail(email: string): Promise<UserResponseData> {
        return await this.userRepository.getUserByEmail(email)
    }

    async createUser(user: CreateUserDto): Promise<UserResponseData> {
        return await this.userRepository.create(user)
    }

    generateToken() {

    }
}
