import { IsNotEmpty, IsString, IsEmail, Length, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * CreateGuestDto нь зочин үүсгэх үед ашиглагдах өгөгдлийг тодорхойлно.
 * 
 * @description Энэхүү DTO нь зочны өгөгдлийг шалгах class-validator аннотацууд болон 
 * Swagger баримт бичиг үүсгэх `@ApiProperty` аннотацуудыг ашиглана.
 */
export class CreateGuestDto {
  /**
   * Зочны имэйл хаяг.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsEmail - Зөв форматын имэйл байх ёстой.
   * @decorator Length - 1-100 тэмдэгт урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  /**
   * Зочны утасны дугаар.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsString - Зөвхөн мөр төрөлтэй байх ёстой.
   * @decorator Length - Зөвхөн 8 тэмдэгттэй байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  phoneNumber: string;

  /**
   * Зочны эхний нэр.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsString - Зөвхөн мөр төрөлтэй байх ёстой.
   * @decorator Length - 1-50 тэмдэгт урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  firstName: string;

  /**
   * Зочны овог.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsString - Зөвхөн мөр төрөлтэй байх ёстой.
   * @decorator Length - 1-50 тэмдэгт урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  lastName: string;

  /**
   * Холбогдох үйл явдлын ID.
   * 
   * @type {number}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsInt - Бүхэл тоо байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  eventId: number;
}
