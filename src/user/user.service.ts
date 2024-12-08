import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * UserService нь хэрэглэгчтэй холбоотой үйлчилгээг хариуцна.
 * 
 * @description Энэхүү үйлчилгээ нь хэрэглэгч үүсгэх, шинэчлэх, устгах, болон мэдээллийг хайх зэрэг 
 * өгөгдлийн сантай холбоотой үйл ажиллагааг гүйцэтгэнэ.
 */
@Injectable()
export class UserService {
  /**
   * UserService-ийн конструктор.
   * 
   * @param {Repository<User>} userRepository - Хэрэглэгчийн entity-г удирдах өгөгдлийн сангийн сангимт.
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Шинэ хэрэглэгч үүсгэх.
   * 
   * @param {CreateUserDto} createUserDto - Хэрэглэгчийн мэдээллийг агуулсан DTO.
   * @returns {Promise<User>} Үүсгэсэн хэрэглэгчийн мэдээлэл.
   * @throws {Error} Хэрэглэгч үүсгэх явцад алдаа гарвал.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      return this.userRepository.save(user);
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Хэрэглэгч үүсгэх боломжгүй байна.');
    }
  }

  /**
   * Хэрэглэгчийн имэйлээр хайлт хийх.
   * 
   * @param {string} email - Хэрэглэгчийн имэйл хаяг.
   * @returns {Promise<User | null>} Олдсон хэрэглэгч эсвэл null.
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user || null; // Хэрэглэгч байхгүй бол null буцаана
  }

  /**
   * Бүх хэрэглэгчдийн жагсаалтыг авах.
   * 
   * @returns {Promise<User[]>} Бүх хэрэглэгчдийн массив.
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Хэрэглэгчийн мэдээллийг шинэчлэх.
   * 
   * @param {number} id - Хэрэглэгчийн ID.
   * @param {UpdateUserDto} updateUserDto - Шинэчлэх мэдээллийг агуулсан DTO.
   * @returns {Promise<User>} Шинэчлэгдсэн хэрэглэгчийн мэдээлэл.
   * @throws {NotFoundException} Хэрэв хэрэглэгч олдохгүй бол.
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(`${id} ID-тай хэрэглэгч олдсонгүй.`);
    }
    return this.userRepository.save(user);
  }

  /**
   * Хэрэглэгч устгах.
   * 
   * @param {number} id - Устгах хэрэглэгчийн ID.
   * @returns {Promise<void>} Амжилттай устгах тохиолдолд ямар ч утга буцаахгүй.
   * @throws {NotFoundException} Хэрэв хэрэглэгч олдохгүй бол.
   */
  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`${id} ID-тай хэрэглэгч олдсонгүй.`);
    }
  }
}
