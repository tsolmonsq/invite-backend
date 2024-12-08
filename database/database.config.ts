import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Guest } from 'src/guest/entities/guest.entity';
import { User } from 'src/user/entities/user.entity';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.MONGO_URI,
  database: process.env.MONGO_DB_NAME, 
  entities: [User, Event, Guest],
  synchronize: false, 
};
