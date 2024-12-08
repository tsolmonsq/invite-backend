import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Event } from 'src/event/entities/event.entity';

/**
 * Guest entity нь зочдын өгөгдлийг илэрхийлнэ.
 * 
 * @description Энэхүү entity нь зочдын мэдээллийг өгөгдлийн сантай холбож, 
 * үйл явдалтай (Event) хамааралтай байдлыг тодорхойлно.
 */
@Entity('guest')
export class Guest {
  /**
   * Зочны анхдагч ID.
   * 
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Зочны имэйл хаяг.
   * 
   * @type {string}
   * @decorator Column - 100 тэмдэгт хүртэл урттай мөр.
   */
  @Column({ length: 100 })
  email: string;

  /**
   * Зочны утасны дугаар.
   * 
   * @type {string}
   * @decorator Column - 8 тэмдэгт хүртэл урттай мөр.
   */
  @Column({ length: 8 })
  phoneNumber: string;

  /**
   * Зочны эхний нэр.
   * 
   * @type {string}
   * @decorator Column - 50 тэмдэгт хүртэл урттай мөр.
   */
  @Column({ length: 50 })
  firstName: string;

  /**
   * Зочны овог.
   * 
   * @type {string}
   * @decorator Column - 50 тэмдэгт хүртэл урттай мөр.
   */
  @Column({ length: 50 })
  lastName: string;

  /**
   * Зочин хамаарах үйл явдал.
   * 
   * @type {Event}
   * @decorator ManyToOne - Зочин олон үйл явдалд харьяалагдаж болох хамаарал.
   * @decorator JoinColumn - `eventId` баганын утгыг харуулах.
   * @relationship Зочин устахад холбоотой үйл явдал устгагдана (`CASCADE`).
   */
  @ManyToOne(() => Event, (event) => event.guests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  event: Event;
}
