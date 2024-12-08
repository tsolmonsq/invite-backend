import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/ create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

/**
 * GuestController нь зочдын API хүсэлтүүдийг удирдана.
 * 
 * @description Зочин үүсгэх, унших, шинэчлэх, устгах үйлдлүүдийг гүйцэтгэхэд 
 * зориулсан эндпойнтуудыг тодорхойлсон контроллер.
 */
@Controller('guests')
export class GuestController {
  /**
   * GuestController-ийн конструктор.
   * 
   * @param {GuestService} guestService - Зочдын бизнес логикийг хариуцах үйлчилгээ.
   */
  constructor(private readonly guestService: GuestService) {}

  /**
   * Шинэ зочин үүсгэх эндпойнт.
   * 
   * @param {CreateGuestDto} createGuestDto - Шинэ зочны өгөгдлийг агуулсан DTO.
   * @returns {Promise<Guest>} Үүсгэсэн зочны мэдээлэл.
   */
  @Post()
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestService.create(createGuestDto);
  }

  /**
   * Бүх зочдын жагсаалтыг авах эндпойнт.
   * 
   * @returns {Promise<Guest[]>} Бүх зочдын мэдээллийн жагсаалт.
   */
  @Get()
  findAll() {
    return this.guestService.findAll();
  }

  /**
   * Тодорхой ID-тай зочны мэдээллийг авах эндпойнт.
   * 
   * @param {number} id - Зочны ID.
   * @returns {Promise<Guest>} Олдсон зочны мэдээлэл.
   * @throws {NotFoundException} Хэрэв зочин олдохгүй бол.
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.guestService.findOne(id);
  }

  /**
   * Тодорхой ID-тай зочны мэдээллийг шинэчлэх эндпойнт.
   * 
   * @param {number} id - Шинэчлэх зочны ID.
   * @param {UpdateGuestDto} updateGuestDto - Шинэчлэлтийн өгөгдөл.
   * @returns {Promise<Guest>} Шинэчлэгдсэн зочны мэдээлэл.
   * @throws {NotFoundException} Хэрэв зочин олдохгүй бол.
   */
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGuestDto: UpdateGuestDto) {
    return this.guestService.update(id, updateGuestDto);
  }

  /**
   * Тодорхой ID-тай зочныг устгах эндпойнт.
   * 
   * @param {number} id - Устгах зочны ID.
   * @returns {Promise<void>} Амжилттай устгасан тохиолдолд утга буцаахгүй.
   * @throws {NotFoundException} Хэрэв зочин олдохгүй бол.
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.guestService.remove(id);
  }
}
