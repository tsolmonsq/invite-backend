import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from 'database/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UserModule
  ],
})
export class AppModule {}
