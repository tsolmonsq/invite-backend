import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

// Орчны хувьсагчдыг ачаалж байна
dotenv.config();

/**
 * Програмыг эхлүүлэх үндсэн функц.
 * 
 * Энэ функц нь NestJS аппликейшнийг эхлүүлэх, Swagger баримт бичгийг үүсгэх, 
 * CORS тохиргоог идэвхжүүлэх зэрэг үүрэгтэй.
 */
async function bootstrap() {
  // NestJS аппликейшнийг үүсгэж байна
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger тохиргоо үүсгэх:
   * - API-ийн нэр, тайлбар, хувилбар зэрэг мэдээллийг тохируулж байна.
   */
  const config = new DocumentBuilder()
    .setTitle('NestJS API') // API-ийн нэр
    .setDescription('API documentation for NestJS app') // API-ийн тайлбар
    .setVersion('1.0') // Хувилбарын дугаар
    .build();

  // Swagger баримт бичгийг үүсгэж, апп-д холбож байна
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  /**
   * CORS (Cross-Origin Resource Sharing) тохиргоо:
   * - http://localhost:3000 хаягаас хандах эрхийг зөвшөөрч байна.
   * - Cookies болон бусад итгэмжлэлтэй мэдээллийг дамжуулахыг зөвшөөрнө.
   */
  app.enableCors({
    origin: 'http://localhost:3000', // Зөвшөөрөгдсөн гарал үүсэл
    credentials: true, // Итгэмжлэлтэй мэдээлэл дамжуулахыг зөвшөөрнө
  });

  // Серверийг 4000 порт дээр эхлүүлж байна
  await app.listen(4000);
}

// Програмыг эхлүүлэх
bootstrap();
