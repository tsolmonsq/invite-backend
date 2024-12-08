import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from 'database/database.config';
import { EventModule } from './event/event.module';
import { GuestModule } from './guest/guest.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UserModule,
    EventModule,
    GuestModule
  ],
})
export class AppModule {}
