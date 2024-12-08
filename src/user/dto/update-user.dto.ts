import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

/**
 * UpdateUserDto нь хэрэглэгчийн мэдээллийг шинэчлэхэд ашиглагдана.
 * 
 * @description Энэхүү DTO нь шинэчлэхэд шаардлагатай хэрэглэгчийн мэдээллийг 
 * шалгах зориулалттай class-validator аннотацуудыг ашиглана.
 */
export class UpdateUserDto {
  /**
   * Хэрэглэгчийн имэйл хаяг.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsString - Зөвхөн мөр төрөлтэй байх ёстой.
   * @decorator Length - 100 тэмдэгт хүртэл урттай байх ёстой.
   */
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
   */
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
   */
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
   */
  @IsNotEmpty()
  @IsString()
  @Length(50)
  lastName: string;

  /**
   * Хэрэглэгчийн нууц үг.
   * 
   * @type {string}
   * @decorator IsNotEmpty - Хоосон байж болохгүй.
   * @decorator IsStrongPassword - Бат бөх нууц үг байх шаардлагатай.
   * @decorator Length - 100 тэмдэгт хүртэл урттай байх ёстой.
   */
  @IsNotEmpty()
  @IsStrongPassword()
  @Length(100)
  password: string;
}
