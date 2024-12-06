import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql8.freesqldatabase.com',
      port: 3306,
      username: 'sql8748638',
      password: 'eRI5Ft2q5L',
      database: 'sql8748638',
      entities: [User], // Ensure `entities` is defined only once
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    UserModule
  ],
})
export class AppModule {}
