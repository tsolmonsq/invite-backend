import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

/**
 * CreateUserDto нь хэрэглэгч үүсгэх үед шаардлагатай өгөгдлийг тодорхойлно.
 * 
 * @description Энэхүү DTO нь шинэ хэрэглэгчийн өгөгдлийг шалгах class-validator аннотацууд болон 
 * Swagger баримт бичиг үүсгэх `@ApiProperty` аннотацуудыг ашиглана.
 */
export class CreateUserDto {
  /**
   * Хэрэглэгчийн имэйл хаяг.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsString - Зөвхөн мөр төрөлтэй байх ёстой.
   * @decorator Length - 100 тэмдэгт хүртэл урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(100)
  email: string;

  /**
   * Хэрэглэгчийн утасны дугаар.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsString - Зөвхөн мөр төрөлтэй байх ёстой.
   * @decorator Length - 8 тэмдэгттэй байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8)
  phoneNumber: string;

  /**
   * Хэрэглэгчийн эхний нэр.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsString - Зөвхөн мөр төрөлтэй байх ёстой.
   * @decorator Length - 50 тэмдэгт хүртэл урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(50)
  firstName: string;

  /**
   * Хэрэглэгчийн овог.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsString - Зөвхөн мөр төрөлтэй байх ёстой.
   * @decorator Length - 50 тэмдэгт хүртэл урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(50)
  lastName: string;

  /**
   * Хэрэглэгчийн нууц үг.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsStrongPassword - Бат бөх нууц үг байх ёстой.
   * @decorator Length - 100 тэмдэгт хүртэл урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  @Length(100)
  password: string;

  /**
   * Хэрэглэгчийн нууц үгийг баталгаажуулах.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsStrongPassword - Бат бөх нууц үг байх ёстой.
   * @decorator Length - 100 тэмдэгт хүртэл урттай байх ёстой.
   * @swagger @ApiProperty - Swagger баримт бичигт нэмэгдэнэ.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  @Length(100)
  passwordConfirmation: string;
}
