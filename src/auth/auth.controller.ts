import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

/**
 * AuthController нь хэрэглэгчийн бүртгэл болон нэвтрэлтийг удирдана.
 * 
 * @description Энэхүү контроллер нь бүртгүүлэх болон нэвтрэх API хүсэлтийг 
 * хүлээн авч, `AuthService`-д дамжуулж гүйцэтгэнэ.
 */
@ApiTags('Auth') // Swagger-ийн "Auth" бүлэгт харагдана.
@Controller('auth')
export class AuthController {
  /**
   * AuthController-ийн конструктор.
   * 
   * @param {AuthService} authService - Хэрэглэгчийн нэвтрэлт, бүртгэлийн үйлчилгээ.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Хэрэглэгч бүртгүүлэх эндпойнт.
   * 
   * @param {CreateUserDto} createUserDto - Бүртгүүлэх хэрэглэгчийн өгөгдөл.
   * @returns {Promise<{ message: string }>} Амжилттай бүртгэгдсэн тухай мессеж.
   * @swagger @ApiOperation - Бүртгэлийн ажиллагааны тайлбар.
   * @swagger @ApiResponse - Амжилттай болон алдаатай хариуны тодорхойлолт.
   */
  @Post('signup')
  @ApiOperation({ summary: 'Хэрэглэгч бүртгүүлэх' })
  @ApiResponse({ status: 201, description: 'Хэрэглэгч амжилттай бүртгэгдсэн.' })
  @ApiResponse({ status: 400, description: 'Алдаа: Бүртгэлтэй хэрэглэгч эсвэл нууц үг таарахгүй.' })
  async signUp(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    return this.authService.signUp(createUserDto);
  }

  /**
   * Хэрэглэгч нэвтрэх эндпойнт.
   * 
   * @param {LoginUserDto} loginUserDto - Нэвтрэх хэрэглэгчийн өгөгдөл.
   * @returns {Promise<{ accessToken: string }>} Амжилттай нэвтрэх үед үүссэн токен.
   * @swagger @ApiOperation - Нэвтрэх ажиллагааны тайлбар.
   * @swagger @ApiResponse - Амжилттай болон алдаатай хариуны тодорхойлолт.
   */
  @Post('login')
  @ApiOperation({ summary: 'Хэрэглэгч нэвтрэх' })
  @ApiResponse({ status: 200, description: 'Амжилттай нэвтэрсэн.' })
  @ApiResponse({ status: 401, description: 'Алдаа: Имэйл эсвэл нууц үг буруу.' })
  async logIn(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.logIn(loginUserDto);
  }
}
