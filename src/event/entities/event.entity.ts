import { Guest } from "src/guest/entities/guest.entity";
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('event')
  export class Event {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    name: string;
  
    @Column({ length: 8 })
    organizer: string;
  
    @Column({ length: 50 })
    email: string;
  
    @Column({ length: 50 })
    image: string;
  
    @Column({ length: 100 })
    startDate: string;

    @Column({ length: 100 })
    endDate: string;

    @OneToMany(() => Guest, (guest) => guest.event)
    guests: Guest[];
  }
  