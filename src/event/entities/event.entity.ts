import { Guest } from 'src/guest/entities/guest.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Event entity нь үйл явдлын өгөгдлийг илэрхийлнэ.
 * 
 * @description Энэхүү entity нь үйл явдалтай холбоотой өгөгдлийг тодорхойлох бөгөөд 
 * тухайн үйл явдалд харьяалагдах зочдын мэдээллийг (guests) агуулна.
 */
@Entity('event')
export class Event {
  /**
   * Үйл явдлын анхдагч ID.
   * 
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Үйл явдлын нэр.
   * 
   * @type {string}
   * @decorator Column - 100 тэмдэгт хүртэл урттай мөр.
   */
  @Column({ length: 100 })
  name: string;

  /**
   * Үйл явдлын зохион байгуулагчийн нэр.
   * 
   * @type {string}
   * @decorator Column - 8 тэмдэгт хүртэл урттай мөр.
   */
  @Column({ length: 8 })
  organizer: string;

  /**
   * Зохион байгуулагчийн имэйл хаяг.
   * 
   * @type {string}
   * @decorator Column - 50 тэмдэгт хүртэл урттай мөр.
   */
  @Column({ length: 50 })
  email: string;

  /**
   * Үйл явдлын зурагны URL эсвэл зам.
   * 
   * @type {string}
   * @decorator Column - 50 тэмдэгт хүртэл урттай мөр.
   */
  @Column({ length: 50 })
  image: string;

  /**
   * Үйл явдлын эхлэх огноо.
   * 
   * @type {string}
   * @decorator Column - 100 тэмдэгт хүртэл урттай мөр.
   */
  @Column({ length: 100 })
  startDate: string;

  /**
   * Үйл явдлын дуусах огноо.
   * 
   * @type {string}
   * @decorator Column - 100 тэмдэгт хүртэл урттай мөр.
   */
  @Column({ length: 100 })
  endDate: string;

  /**
   * Үйл явдалд харьяалагдах зочдын жагсаалт.
   * 
   * @type {Guest[]}
   * @decorator OneToMany - Үйл явдал олон зочинтой холбоотой.
   * @relationship Зочин бүр тухайн үйл явдалд харьяалагдана.
   */
  @OneToMany(() => Guest, (guest) => guest.event)
  guests: Guest[];
}
