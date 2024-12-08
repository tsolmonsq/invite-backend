import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

/**
 * EventService нь үйл явдалтай холбоотой бизнес логик болон өгөгдлийн сангийн үйл ажиллагааг хариуцна.
 */
@Injectable()
export class EventService {
  /**
   * EventService-ийн конструктор.
   * 
   * @param {Repository<Event>} eventRepository - Үйл явдалтай холбоотой өгөгдлийн сангийн сангимт.
   */
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  /**
   * Шинэ үйл явдал үүсгэх.
   * 
   * @param {CreateEventDto} createEventDto - Үйл явдлын өгөгдлийг агуулсан DTO.
   * @returns {Promise<Event>} Үүсгэсэн үйл явдал.
   * @throws {InternalServerErrorException} Үүсгэх явцад алдаа гарвал.
   */
  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const event = this.eventRepository.create(createEventDto);
      return await this.eventRepository.save(event);
    } catch (error) {
      console.error('Үйл явдал үүсгэхэд алдаа гарлаа:', error);
      throw new InternalServerErrorException('Үйл явдал үүсгэж чадсангүй');
    }
  }

  /**
   * Бүх үйл явдлыг авах.
   * 
   * @returns {Promise<Event[]>} Үйл явдлын жагсаалт.
   * @throws {InternalServerErrorException} Жагсаалт авах явцад алдаа гарвал.
   */
  async findAll(): Promise<Event[]> {
    try {
      return await this.eventRepository.find({
        relations: ['guests'], // Холбогдсон зочдыг хамааруулж авна.
      });
    } catch (error) {
      console.error('Үйл явдлын жагсаалт авахад алдаа гарлаа:', error);
      throw new InternalServerErrorException('Үйл явдлыг авахад алдаа гарлаа');
    }
  }

  /**
   * Тодорхой ID-тай үйл явдлыг авах.
   * 
   * @param {number} id - Үйл явдлын ID.
   * @returns {Promise<Event>} Олдсон үйл явдал.
   * @throws {NotFoundException} Хэрэв үйл явдал олдохгүй бол.
   * @throws {InternalServerErrorException} Авчрах явцад алдаа гарвал.
   */
  async findOne(id: number): Promise<Event> {
    try {
      const event = await this.eventRepository.findOne({
        where: { id },
        relations: ['guests'], // Холбогдсон зочдыг хамааруулж авна.
      });
      if (!event) {
        throw new NotFoundException(`${id} ID-тай үйл явдал олдсонгүй`);
      }
      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Үйл явдал авахад алдаа гарлаа:', error);
      throw new InternalServerErrorException('Үйл явдал авахад алдаа гарлаа');
    }
  }

  /**
   * Үйл явдлыг шинэчлэх.
   * 
   * @param {number} id - Шинэчлэх үйл явдлын ID.
   * @param {UpdateEventDto} updateEventDto - Шинэчлэх өгөгдлийг агуулсан DTO.
   * @returns {Promise<Event>} Шинэчлэгдсэн үйл явдал.
   * @throws {NotFoundException} Хэрэв үйл явдал олдохгүй бол.
   * @throws {InternalServerErrorException} Шинэчлэх явцад алдаа гарвал.
   */
  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    try {
      const event = await this.findOne(id); // Үйл явдал байгаа эсэхийг шалгах.
      Object.assign(event, updateEventDto);
      return await this.eventRepository.save(event);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Үйл явдал шинэчлэхэд алдаа гарлаа:', error);
      throw new InternalServerErrorException('Үйл явдал шинэчлэхэд алдаа гарлаа');
    }
  }

  /**
   * Үйл явдлыг устгах.
   * 
   * @param {number} id - Устгах үйл явдлын ID.
   * @returns {Promise<void>} Амжилттай устгасан тохиолдолд утга буцаахгүй.
   * @throws {NotFoundException} Хэрэв үйл явдал олдохгүй бол.
   * @throws {InternalServerErrorException} Устгах явцад алдаа гарвал.
   */
  async remove(id: number): Promise<void> {
    try {
      const event = await this.findOne(id); // Үйл явдал байгаа эсэхийг шалгах.
      await this.eventRepository.remove(event);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Үйл явдал устгахад алдаа гарлаа:', error);
      throw new InternalServerErrorException('Үйл явдал устгахад алдаа гарлаа');
    }
  }
}
