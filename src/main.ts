import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API documentation for NestJS app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true, // Allow cookies and credentials
  });
  
  await app.listen(4000);
}
bootstrap();
