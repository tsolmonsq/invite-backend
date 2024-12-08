import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';

/**
 * AuthModule нь хэрэглэгчийн нэвтрэлт, бүртгэлийн модулийг удирдана.
 * 
 * @description Энэхүү модуль нь JWT токен үүсгэх, баталгаажуулах, 
 * болон хэрэглэгчийн нэвтрэлтийг удирдах үүрэгтэй.
 */
@Module({
  imports: [
    /**
     * ConfigModule нь орчны тохиргоог удирдана.
     */
    ConfigModule,

    /**
     * UserModule нь хэрэглэгчийн өгөгдөлтэй ажиллах үйлчилгээг агуулна.
     */
    UserModule,

    /**
     * PassportModule нь нэвтрэлтийн механизмыг хангана.
     */
    PassportModule,

    /**
     * JwtModule нь JWT токен үүсгэх, баталгаажуулахад ашиглагдана.
     * 
     * @property {string} secret - Токены нууц түлхүүр.
     * @property {object} signOptions - Токены хүчинтэй хугацаа (1 цаг).
     */
    JwtModule.register({
      secret: 'your-secret-key', // Токены нууц түлхүүр.
      signOptions: { expiresIn: '1h' }, // Токены хүчинтэй хугацаа.
    }),
  ],
  controllers: [
    /**
     * AuthController нь хэрэглэгчийн нэвтрэх болон бүртгүүлэх API хүсэлтүүдийг удирдана.
     */
    AuthController,
  ],
  providers: [
    /**
     * AuthService нь хэрэглэгчийн бүртгэл, нэвтрэлт, токены үүсгэлтийг удирдана.
     */
    AuthService,
  ],
})
export class AuthModule {}
