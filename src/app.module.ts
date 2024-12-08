import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from 'database/database.config';
import { EventModule } from './event/event.module';
import { GuestModule } from './guest/guest.module';

/**
 * AppModule нь аппликейшний үндсэн модуль юм.
 * 
 * @description Энэхүү модуль нь бусад модулиудыг импортолж, 
 * аппликейшний үндсэн тохиргоог бүрдүүлнэ.
 */
@Module({
  imports: [
    /**
     * TypeORM модулийг тохиргоотойгоор ачаалж байна.
     * @see databaseConfig - өгөгдлийн сангийн тохиргоог агуулсан файл.
     */
    TypeOrmModule.forRoot(databaseConfig),

    /**
     * Бүртгэл болон нэвтрэх үйл ажиллагааг хариуцсан модуль.
     */
    AuthModule,

    /**
     * Хэрэглэгчтэй холбоотой үйлчилгээг хариуцсан модуль.
     */
    UserModule,

    /**
     * Үйл явдлын зохицуулалтыг хариуцсан модуль.
     */
    EventModule,

    /**
     * Зочидтой холбоотой үйл ажиллагааг хариуцсан модуль.
     */
    GuestModule,
  ],
})
export class AppModule {}
