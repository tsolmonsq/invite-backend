import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * CreateEventDto нь үйл явдал үүсгэхэд ашиглагдах өгөгдлийг тодорхойлно.
 * 
 * @description Энэхүү DTO нь үйл явдлын өгөгдлийг шалгах class-validator 
 * аннотацууд болон Swagger баримт бичиг үүсгэх `@ApiProperty` аннотацуудыг ашиглана.
 */
export class CreateEventDto {
  /**
   * Үйл явдлын нэр.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsString - Зөвхөн мөр төрөлтэй байх ёстой.
   * @decorator Length - 1-100 тэмдэгт урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  /**
   * Үйл явдлын зохион байгуулагчийн нэр.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsString - Зөвхөн мөр төрөлтэй байх ёстой.
   * @decorator Length - 1-100 тэмдэгт урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  organizer: string;

  /**
   * Зохион байгуулагчийн имэйл хаяг.
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
   * Үйл явдлын зурагны URL эсвэл зам.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsString - Зөвхөн мөр төрөлтэй байх ёстой.
   * @decorator Length - 1-255 тэмдэгт урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  image?: string;

  /**
   * Үйл явдлын эхлэх огноо.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsDateString - ISO 8601 форматын огноо байх ёстой.
   * @decorator Length - 1-100 тэмдэгт урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @Length(1, 100)
  startDate: string;

  /**
   * Үйл явдлын дуусах огноо.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsDateString - ISO 8601 форматын огноо байх ёстой.
   * @decorator Length - 1-100 тэмдэгт урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @Length(1, 100)
  endDate: string;

  @ApiProperty()
  @Length(1, 100)
  address: string;
}
