import { Controller, Get, Version } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers()
    }
}
