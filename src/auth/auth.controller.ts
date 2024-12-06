import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  async logIn(
    @Body() loginUserDto: LoginUserDto
  ): Promise<{ accessToken: string }> {
    return this.authService.logIn(loginUserDto);
  }
}
