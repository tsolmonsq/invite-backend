import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Event } from './entities/event.entity';

/**
 * EventModule нь үйл явдалтай холбоотой модулийг удирдана.
 * 
 * @description Энэхүү модуль нь үйл явдал (Event)-тай холбоотой бүх үйлчилгээг (service),
 * контроллерийг (controller), болон өгөгдлийн сангийн тохиргоог агуулна.
 */
@Module({
  imports: [
    /**
     * TypeORM модулийг Event entity-тэй холбож байна.
     * 
     * @description Event entity-г өгөгдлийн сантай холбож,
     * түүний удирдлагыг хариуцна.
     */
    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [
    /**
     * EventController нь үйл явдлын API хүсэлтийг удирдана.
     * 
     * @description Үйл явдал үүсгэх, унших, шинэчлэх, устгах үйлдлийг API-аар дамжуулан удирдана.
     */
    EventController,
  ],
  providers: [
    /**
     * EventService нь үйл явдалтай холбоотой бизнес логик болон өгөгдлийн сангийн үйлдлийг хариуцна.
     */
    EventService,
  ],
})
export class EventModule {}
