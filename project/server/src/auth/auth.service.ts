import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/user.service';
import { JwtService } from "@nestjs/jwt";
import { AuthPayload } from './interface/auth-payload.interface';
import { expiresTime, jwtConstants } from './constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async compaiePassword(password: string, storePasswordHash: string): Promise<any> {
    return await bcrypt.compare(password, storePasswordHash)
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const check = await this.compaiePassword(pass, user.password)
    if (!check) {
      return null;
    }
    return user.email;
  }

  async signin(user: User) {
    const payload: AuthPayload = {
      email: user.email
    }
    return {
      expiresIn: moment().add(expiresTime.time, 'minutes'),
      refreshToken: this.jwtService.sign(payload, { secret: jwtConstants.secret })
    }
  }

  async signup(user: CreateUserDto) {
    // check email existe
    const isUserFound = await this.usersService.getUserByEmail(user.email)
    if (isUserFound) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: "Email is existed" },
        HttpStatus.BAD_REQUEST
      )
    }
    user.password = await this.hashPassword(user.password)
    return this.usersService.createUser(user)
  }
}
