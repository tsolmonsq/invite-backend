import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

/**
 * EventController нь үйл явдлын API хүсэлтүүдийг удирдана.
 * 
 * @description Үйл явдал үүсгэх, унших, шинэчлэх, устгах үйлдлийг хариуцна.
 */
@Controller('events')
export class EventController {
  /**
   * EventController-ийн конструктор.
   * 
   * @param {EventService} eventService - Үйл явдлын бизнес логикыг хариуцах үйлчилгээ.
   */
  constructor(private readonly eventService: EventService) {}

  /**
   * Шинэ үйл явдал үүсгэх эндпойнт.
   * 
   * @param {CreateEventDto} createEventDto - Үйл явдлын өгөгдлийг агуулсан DTO.
   * @returns {Promise<Event>} Үүсгэсэн үйл явдал.
   */
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  /**
   * Бүх үйл явдлын жагсаалтыг авах эндпойнт.
   * 
   * @returns {Promise<Event[]>} Бүх үйл явдлын жагсаалт.
   */
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  /**
   * Тодорхой ID-тай үйл явдлын мэдээллийг авах эндпойнт.
   * 
   * @param {number} id - Үйл явдлын ID.
   * @returns {Promise<Event>} Олдсон үйл явдал.
   * @throws {NotFoundException} Хэрэв үйл явдал олдохгүй бол.
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventService.findOne(id);
  }

  /**
   * Тодорхой ID-тай үйл явдлын мэдээллийг шинэчлэх эндпойнт.
   * 
   * @param {number} id - Шинэчлэх үйл явдлын ID.
   * @param {UpdateEventDto} updateEventDto - Шинэчлэлтийн өгөгдөл.
   * @returns {Promise<Event>} Шинэчлэгдсэн үйл явдал.
   * @throws {NotFoundException} Хэрэв үйл явдал олдохгүй бол.
   */
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  /**
   * Тодорхой ID-тай үйл явдлыг устгах эндпойнт.
   * 
   * @param {number} id - Устгах үйл явдлын ID.
   * @returns {Promise<void>} Амжилттай устгасан тохиолдолд утга буцаахгүй.
   * @throws {NotFoundException} Хэрэв үйл явдал олдохгүй бол.
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventService.remove(id);
  }
}
