import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

/**
 * LoginUserDto нь хэрэглэгчийн нэвтрэхэд шаардлагатай өгөгдлийг тодорхойлно.
 * 
 * @description Энэхүү DTO нь хэрэглэгчийн имэйл болон нууц үгийг шалгах зорилготой.
 */
export class LoginUserDto {
  /**
   * Хэрэглэгчийн имэйл хаяг.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsString - Зөвхөн мөр төрөлтэй байх ёстой.
   * @decorator Length - 100 тэмдэгт урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  email: string;

  /**
   * Хэрэглэгчийн нууц үг.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator Length - 100 тэмдэгт урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 100)
  password: string;
}
