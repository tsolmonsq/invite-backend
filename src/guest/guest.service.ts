import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './entities/guest.entity';
import { CreateGuestDto } from './dto/ create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

/**
 * GuestService нь зочидтой холбоотой үйл ажиллагааг хариуцна.
 * 
 * @description Энэхүү үйлчилгээ нь зочид үүсгэх, унших, шинэчлэх, устгах 
 * зэрэг өгөгдлийн сантай холбоотой үйлдлүүдийг гүйцэтгэнэ.
 */
@Injectable()
export class GuestService {
  /**
   * GuestService-ийн конструктор.
   * 
   * @param {Repository<Guest>} guestRepository - Зочдын entity-г удирдах өгөгдлийн сангийн сангимт.
   */
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
  ) {}

  /**
   * Шинэ зочин үүсгэх.
   * 
   * @param {CreateGuestDto} createGuestDto - Шинэ зочны мэдээллийг агуулсан DTO.
   * @returns {Promise<Guest>} Үүсгэсэн зочны мэдээлэл.
   * @throws {InternalServerErrorException} Зочин үүсгэх явцад алдаа гарвал.
   */
  async create(createGuestDto: CreateGuestDto): Promise<Guest> {
    try {
      const guest = this.guestRepository.create(createGuestDto);
      return await this.guestRepository.save(guest);
    } catch (error) {
      throw new InternalServerErrorException(
        'Зочин үүсгэхэд алдаа гарлаа',
        error.message,
      );
    }
  }

  /**
   * Бүх зочдыг авах.
   * 
   * @returns {Promise<Guest[]>} Бүх зочдын жагсаалт.
   * @throws {InternalServerErrorException} Зочдын жагсаалт авах явцад алдаа гарвал.
   */
  async findAll(): Promise<Guest[]> {
    try {
      return await this.guestRepository.find({
        relations: ['event'], // Зочныг үйл явдалтай холбож байна.
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Зочдын жагсаалт авахад алдаа гарлаа',
        error.message,
      );
    }
  }

  /**
   * Тодорхой ID-тай зочин авах.
   * 
   * @param {number} id - Зочны ID.
   * @returns {Promise<Guest>} Олдсон зочны мэдээлэл.
   * @throws {NotFoundException} Хэрэв зочин олдохгүй бол.
   * @throws {InternalServerErrorException} Зочныг авах явцад алдаа гарвал.
   */
  async findOne(id: number): Promise<Guest> {
    try {
      const guest = await this.guestRepository.findOne({
        where: { id },
        relations: ['event'],
      });
      if (!guest) {
        throw new NotFoundException(`${id} ID-тай зочин олдсонгүй.`);
      }
      return guest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Зочин авах явцад алдаа гарлаа',
        error.message,
      );
    }
  }

  /**
   * Зочны мэдээллийг шинэчлэх.
   * 
   * @param {number} id - Шинэчлэх зочны ID.
   * @param {UpdateGuestDto} updateGuestDto - Шинэчлэлтийн өгөгдөл.
   * @returns {Promise<Guest>} Шинэчлэгдсэн зочны мэдээлэл.
   * @throws {NotFoundException} Хэрэв зочин олдохгүй бол.
   * @throws {InternalServerErrorException} Шинэчлэх явцад алдаа гарвал.
   */
  async update(id: number, updateGuestDto: UpdateGuestDto): Promise<Guest> {
    try {
      const guest = await this.findOne(id); // Зочин байгаа эсэхийг шалгах.
      Object.assign(guest, updateGuestDto);
      return await this.guestRepository.save(guest);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Зочныг шинэчлэхэд алдаа гарлаа',
        error.message,
      );
    }
  }

  /**
   * Зочин устгах.
   * 
   * @param {number} id - Устгах зочны ID.
   * @returns {Promise<void>} Амжилттай устгасан тохиолдолд утга буцаахгүй.
   * @throws {NotFoundException} Хэрэв зочин олдохгүй бол.
   * @throws {InternalServerErrorException} Устгах явцад алдаа гарвал.
   */
  async remove(id: number): Promise<void> {
    try {
      const guest = await this.findOne(id); // Зочин байгаа эсэхийг шалгах.
      await this.guestRepository.remove(guest);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Зочин устгахад алдаа гарлаа',
        error.message,
      );
    }
  }
}
