import { Controller, Post, Version, UseGuards, Request, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-guard.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Version('v1')
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req): Promise<any> {
    return await this.authService.signin(req.user);
  }

  @Version('v1')
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.authService.signup(createUserDto);
  }
}
