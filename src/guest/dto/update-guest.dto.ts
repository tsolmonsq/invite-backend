import { PartialType } from '@nestjs/swagger';
import { CreateGuestDto } from './ create-guest.dto';

/**
 * UpdateGuestDto нь зочны мэдээллийг шинэчлэх үед ашиглагдах DTO.
 * 
 * @description Энэхүү DTO нь `CreateGuestDto`-ийн бүх талбарыг агуулсан боловч 
 * бүх талбаруудыг заавал шаардлагатай биш (optional) болгож шинэчлэлтийн өгөгдлийг тодорхойлно.
 */
export class UpdateGuestDto extends PartialType(CreateGuestDto) {}
