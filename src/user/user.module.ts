import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

/**
 * UserModule нь хэрэглэгчтэй холбоотой үйл ажиллагааг удирдах модуль.
 * 
 * @description Энэхүү модуль нь `User` entity-г удирдах өгөгдлийн сангийн тохиргоо, 
 * үйлчилгээнүүд (`UserService`), болон API удирдлагын контроллер (`UserController`)-ыг агуулна.
 */
@Module({
  imports: [
    /**
     * `TypeOrmModule` нь `User` entity-г өгөгдлийн сантай холбохыг хангана.
     */
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [
    /**
     * Хэрэглэгчтэй холбоотой API хүсэлтийг хүлээн авах, удирдах контроллер.
     */
    UserController,
  ],
  providers: [
    /**
     * Хэрэглэгчтэй холбоотой үйлчилгээг хэрэгжүүлдэг service.
     */
    UserService,
  ],
  exports: [
    /**
     * Бусад модулиудад `UserService`-г ашиглах боломжийг олгоно.
     */
    UserService,
  ],
})
export class UserModule {}
