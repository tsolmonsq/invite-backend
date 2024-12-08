import {
  Controller,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

/**
 * Хэрэглэгчийн API-г удирдах контроллер.
 * 
 * @description Энэхүү контроллер нь хэрэглэгчийг үүсгэх, унших, шинэчлэх, устгах 
 * үйл ажиллагааг гүйцэтгэнэ.
 */
@ApiTags('Users') // Swagger-д "Users" бүлэгт харагдана.
@Controller('users')
export class UserController {
  /**
   * UserController-ийн конструктор.
   * 
   * @param {UserService} userService - Хэрэглэгчтэй холбоотой үйлчилгээг удирдана.
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Хэрэглэгчийг имэйлээр хайх.
   * 
   * @param {string} email - Хэрэглэгчийн имэйл.
   * @returns {Promise<User>} Олдсон хэрэглэгчийн мэдээлэл.
   */
  @Get(':email')
  findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  /**
   * Бүх хэрэглэгчдийн жагсаалтыг авах.
   * 
   * @returns {Promise<User[]>} Бүх хэрэглэгчдийн мэдээлэл.
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * Хэрэглэгчийн мэдээллийг шинэчлэх.
   * 
   * @param {number} id - Шинэчлэх хэрэглэгчийн ID.
   * @param {UpdateUserDto} updateUserDto - Шинэчлэх мэдээлэл.
   * @returns {Promise<User>} Шинэчлэгдсэн хэрэглэгчийн мэдээлэл.
   */
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Хэрэглэгч устгах.
   * 
   * @param {number} id - Устгах хэрэглэгчийн ID.
   * @returns {Promise<void>} Устгах үйлдэл амжилттай хийгдсэн.
   */
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
