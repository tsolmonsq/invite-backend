import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Guest } from 'src/guest/entities/guest.entity';
import { User } from 'src/user/entities/user.entity';
// Add any other entities
import { Event } from 'src/event/entities/event.entity';

// Load environment variables
dotenv.config();

/**
 * TypeORM module configuration for MySQL.
 *
 * This configuration connects to a MySQL database and manages entities like User, Event, and Guest.
 *
 * @type {TypeOrmModuleOptions}
 */
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres', 
  host: 'localhost', 
  port: 5432, 
  username: 'root', 
  password: 'root_password', 
  database: 'invite', 
  entities: [User, Event, Guest], 
  synchronize: true, 
};
