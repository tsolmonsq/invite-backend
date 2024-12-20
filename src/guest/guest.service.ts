import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './entities/guest.entity';
import { Event } from 'src/event/entities/event.entity';
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
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}


  async createMany(createGuestDtos: CreateGuestDto[]) {
    const guests = this.guestRepository.create(createGuestDtos);
    return await this.guestRepository.save(guests);
  }

  /**
   * Шинэ зочин үүсгэх.
   * 
   * @param {CreateGuestDto} createGuestDto - Шинэ зочны мэдээллийг агуулсан DTO.
   * @returns {Promise<Guest>} Үүсгэсэн зочны мэдээлэл.
   * @throws {InternalServerErrorException} Зочин үүсгэх явцад алдаа гарвал.
   */
  async create(createGuestDto: CreateGuestDto): Promise<Guest> {
      try {
        let event = null;
        if (createGuestDto.eventId) {
          event = await this.eventRepository.findOne({ where: { id: createGuestDto.eventId } });
          if (!event) {
            throw new NotFoundException(`Event with ID ${createGuestDto.eventId} not found`);
          }
        }
  
        const guest = this.guestRepository.create({
          ...createGuestDto,
          event, 
        });
    
        return await this.guestRepository.save(guest);
      } catch (error) {
        console.error('Error creating guest:', error);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Failed to create guest');
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
      const guests = await this.guestRepository
        .createQueryBuilder('guest')
        .leftJoinAndSelect('guest.event', 'event')
        .getMany();
      console.log('Guests with events (QueryBuilder):', JSON.stringify(guests, null, 2));
      return guests;
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
      console.log('Guest fetched:', guest);
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
      const guest = await this.findOne(id);

      let event = guest.event;
      if (updateGuestDto.eventId !== undefined) {
        event = await this.eventRepository.findOne({
          where: { id: updateGuestDto.eventId },
        });

        if (!event) {
          throw new NotFoundException(`Event with ID ${updateGuestDto.eventId} not found`);
        }
      }

      const updatedGuest = {
        ...guest,
        ...updateGuestDto,
        event,
      };

      return await this.guestRepository.save(updatedGuest);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error updating guest:', error);
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
