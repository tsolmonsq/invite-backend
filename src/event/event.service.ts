import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  /**
   * Create a new event
   * @param createEventDto Data Transfer Object for creating an event
   */
  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const event = this.eventRepository.create(createEventDto);
      return await this.eventRepository.save(event);
    } catch (error) {
      console.error('Error creating event:', error);
      throw new InternalServerErrorException('Failed to create event');
    }
  }

  /**
   * Fetch all events
   */
  async findAll(): Promise<Event[]> {
    try {
      return await this.eventRepository.find({
        relations: ['guests'], // Include guests in the response
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new InternalServerErrorException('Failed to fetch events');
    }
  }

  /**
   * Fetch a single event by ID
   * @param id Event ID
   */
  async findOne(id: number): Promise<Event> {
    try {
      const event = await this.eventRepository.findOne({
        where: { id },
        relations: ['guests'], // Include guests in the response
      });
      if (!event) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }
      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error fetching event:', error);
      throw new InternalServerErrorException('Failed to fetch event');
    }
  }

  /**
   * Update an existing event by ID
   * @param id Event ID
   * @param updateEventDto Data Transfer Object for updating an event
   */
  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    try {
      const event = await this.findOne(id); // Ensure event exists
      Object.assign(event, updateEventDto);
      return await this.eventRepository.save(event);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error updating event:', error);
      throw new InternalServerErrorException('Failed to update event');
    }
  }

  /**
   * Remove an event by ID
   * @param id Event ID
   */
  async remove(id: number): Promise<void> {
    try {
      const event = await this.findOne(id); // Ensure event exists
      await this.eventRepository.remove(event);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error deleting event:', error);
      throw new InternalServerErrorException('Failed to delete event');
    }
  }
}
