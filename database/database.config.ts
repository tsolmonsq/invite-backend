import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Guest } from 'src/guest/entities/guest.entity';
import { User } from 'src/user/entities/user.entity';

// Орчны хувьсагчдыг ачаалж байна
dotenv.config();

/**
 * TypeORM модулийн өгөгдлийн сангийн тохиргоо.
 * 
 * Энэхүү тохиргоо нь MongoDB өгөгдлийн сантай холбогдох, 
 * мөн User, Event, Guest зэрэг entity-г удирдахад ашиглагдана.
 * 
 * @type {TypeOrmModuleOptions}
 * @property {string} type - Өгөгдлийн сангийн төрөл, 'mongodb' гэж заагдсан.
 * @property {string} url - MongoDB сервертэй холбогдох URI, орчны хувьсагчаас авна.
 * @property {string} database - MongoDB өгөгдлийн сангийн нэр, орчны хувьсагчаас авна.
 * @property {Array} entities - MongoDB collection-д харгалзах entity классуудын жагсаалт.
 * @property {boolean} synchronize - Хэрэв `false` байвал өгөгдлийн сангийн схем автоматаар өөрчлөгдөхгүй.
 */
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mongodb', // Өгөгдлийн сангийн төрлийг MongoDB гэж тохируулж байна.
  url: process.env.MONGO_URI, // MongoDB серверийн URI-г орчны хувьсагчаас авч байна.
  database: process.env.MONGO_DB_NAME, // MongoDB өгөгдлийн сангийн нэрийг орчны хувьсагчаас авч байна.
  entities: [User, Event, Guest], // Өгөгдлийн сантай холбогдох entity классууд.
  synchronize: false, // Өгөгдлийн сангийн схем автоматаар өөрчлөгдөхгүй (production-д аюулгүй).
};
