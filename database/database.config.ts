import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/user/entities/user.entity';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.MONGO_URI,
  database: process.env.MONGO_DB_NAME, 
  useUnifiedTopology: true,
  entities: [User],
  synchronize: true, 
};
