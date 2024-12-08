import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

/**
 * AuthService нь хэрэглэгчийн нэвтрэлт болон бүртгэлийг удирдана.
 * 
 * @description Энэхүү үйлчилгээ нь хэрэглэгчийн бүртгэл хийх, нэвтрэх, 
 * болон JWT токен үүсгэх үүрэгтэй.
 */
@Injectable()
export class AuthService {
  /**
   * AuthService-ийн конструктор.
   * 
   * @param {UserService} userService - Хэрэглэгчийн өгөгдлийг удирдах үйлчилгээ.
   * @param {JwtService} jwtService - JWT токен үүсгэх, баталгаажуулах үйлчилгээ.
   */
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Хэрэглэгчийн бүртгэл хийх.
   * 
   * @param {CreateUserDto} createUserDto - Хэрэглэгчийн бүртгэлийн өгөгдлийг агуулсан DTO.
   * @returns {Promise<{ message: string }>} Амжилттай бүртгэлийн мэдээлэл.
   * @throws {BadRequestException} Хэрэв нууц үг таарахгүй эсвэл хэрэглэгч бүртгэлтэй бол.
   */
  async signUp(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { email, password, passwordConfirmation } = createUserDto;

    if (password !== passwordConfirmation) {
      throw new BadRequestException('Нууц үг таарахгүй байна.');
    }

    const userExists = await this.userService.findByEmail(email);
    if (userExists) {
      throw new BadRequestException('Хэрэглэгч бүртгэлтэй байна.');
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = {
        ...createUserDto,
        password: hashedPassword,
      };

      await this.userService.create(user);
      return { message: 'Амжилттай бүртгэлээ.' };
    } catch (error) {
      console.error('Sign-up error:', error);
      throw new BadRequestException(
        `Бүртгэл хийх явцад алдаа гарлаа: ${error.message}`,
      );
    }
  }

  /**
   * Хэрэглэгчийн нэвтрэх.
   * 
   * @param {LoginUserDto} loginUserDto - Нэвтрэх өгөгдлийг агуулсан DTO.
   * @returns {Promise<{ accessToken: string }>} Амжилттай нэвтэрсний дараах токен.
   * @throws {UnauthorizedException} Хэрэв хэрэглэгч бүртгэлгүй эсвэл нууц үг буруу бол.
   * @throws {BadRequestException} Нэвтрэх явцад алдаа гарвал.
   */
  async logIn(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;

    try {
      const user = await this.userService.findByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Хэрэглэгч бүртгэлгүй байна.');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(
          'Нэвтрэх нууц үг эсвэл имэйл хаяг буруу байна.',
        );
      }

      const payload = { sub: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      console.error('Login error:', error);
      throw new BadRequestException(
        `Нэвтрэх явцад алдаа гарлаа. Та дахин оролдоно уу. ${error.message}`,
      );
    }
  }
}
