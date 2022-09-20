import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }
    async getUsers(): Promise<User[]> {
        return this.userRepository.find()
    }
}
