import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { Event } from 'src/event/entities/event.entity';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';

/**
 * GuestModule нь зочдын үйл ажиллагааг удирдах модуль.
 * 
 * @description Энэхүү модуль нь зочин entity-г удирдах TypeORM тохиргоо, 
 * зочны бизнес логик хариуцсан `GuestService`, болон API хүсэлтийг хариуцсан `GuestController`-ийг агуулна.
 */
@Module({
  imports: [
    /**
     * TypeORM модулийг `Guest` entity-тай холбож байна.
     * 
     * @description Зочдын өгөгдлийн сантай холбоотой бүх үйл ажиллагааг 
     * удирдахад хэрэглэгдэнэ.
     */
    TypeOrmModule.forFeature([Guest, Event]),
  ],
  controllers: [
    /**
     * Зочдын API хүсэлтийг удирдах контроллер.
     * 
     * @description Зочин үүсгэх, унших, шинэчлэх, устгах үйлдлийг API-аар 
     * дамжуулан хариуцна.
     */
    GuestController,
  ],
  providers: [
    /**
     * Зочдын бизнес логик болон өгөгдлийн сангийн үйл ажиллагааг хариуцах үйлчилгээ.
     */
    GuestService,
  ],
})
export class GuestModule {}
