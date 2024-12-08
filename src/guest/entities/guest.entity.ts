import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from 'src/event/entities/event.entity';

@Entity('guest')
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 8 })
  phoneNumber: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @ManyToOne(() => Event, (event) => event.guests, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'eventId' }) 
  event: Event;
}
