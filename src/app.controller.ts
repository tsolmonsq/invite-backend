import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * AppController нь HTTP хүсэлтийг зохицуулж, AppService-тэй холбогддог.
 * 
 * @description Энэхүү контроллер нь аппликейшний үндсэн замыг удирдаж,
 * үйлчилгээнээс өгөгдөл авах үүрэгтэй.
 */
@Controller()
export class AppController {
  /**
   * AppController-ийн конструктор.
   * 
   * @param {AppService} appService - Аппликейшний үндсэн үйлчилгээг гүйцэтгэдэг service.
   */
  constructor(private readonly appService: AppService) {}
}
