import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * User entity нь хэрэглэгчийн өгөгдлийг илэрхийлнэ.
 * 
 * @description Энэхүү entity нь өгөгдлийн сантай холбогдох хэрэглэгчийн 
 * мэдээллийг тодорхойлно.
 */
@Entity('user')
export class User {
  /**
   * Хэрэглэгчийн анхдагч ID.
   * 
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Хэрэглэгчийн имэйл хаяг.
   * 
   * @type {string}
   * @length 100 тэмдэгт хүртэл урттай.
   */
  @Column({ length: 100 })
  email: string;

  /**
   * Хэрэглэгчийн утасны дугаар.
   * 
   * @type {string}
   * @length 8 тэмдэгт хүртэл урттай.
   */
  @Column({ length: 8 })
  phoneNumber: string;

  /**
   * Хэрэглэгчийн эхний нэр.
   * 
   * @type {string}
   * @length 50 тэмдэгт хүртэл урттай.
   */
  @Column({ length: 50 })
  firstName: string;

  /**
   * Хэрэглэгчийн овог.
   * 
   * @type {string}
   * @length 50 тэмдэгт хүртэл урттай.
   */
  @Column({ length: 50 })
  lastName: string;

  /**
   * Хэрэглэгчийн нууц үг.
   * 
   * @type {string}
   * @length 100 тэмдэгт хүртэл урттай.
   */
  @Column({ length: 100 })
  password: string;
}
