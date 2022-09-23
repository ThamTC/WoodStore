import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './user.service';

@Controller("auth")
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @Get()
    getUserByEmail(): Promise<User> {
        return this.userService.getUserByEmail("admin@gmail.com")
    }
}
