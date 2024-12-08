import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './entities/guest.entity';
import { CreateGuestDto } from './dto/ create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
  ) {}

  async create(createGuestDto: CreateGuestDto): Promise<Guest> {
    try {
      const guest = this.guestRepository.create(createGuestDto);
      return await this.guestRepository.save(guest);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create guest', error.message);
    }
  }

  async findAll(): Promise<Guest[]> {
    try {
      return await this.guestRepository.find({
        relations: ['event'], 
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch guests', error.message);
    }
  }
  
  async findOne(id: number): Promise<Guest> {
    try {
      const guest = await this.guestRepository.findOne({
        where: { id },
        relations: ['event'],
      });
      if (!guest) {
        throw new NotFoundException(`Guest with ID ${id} not found`);
      }
      return guest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch guest', error.message);
    }
  }

  async update(id: number, updateGuestDto: UpdateGuestDto): Promise<Guest> {
    try {
      const guest = await this.findOne(id); // Ensure guest exists
      Object.assign(guest, updateGuestDto);
      return await this.guestRepository.save(guest);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update guest', error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const guest = await this.findOne(id); // Ensure guest exists
      await this.guestRepository.remove(guest);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete guest', error.message);
    }
  }
}
