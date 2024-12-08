import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

/**
 * UpdateEventDto нь үйл явдлын мэдээллийг шинэчлэхэд ашиглагдах DTO.
 * 
 * @description Энэхүү DTO нь `CreateEventDto`-ийн бүх талбарыг агуулна. Гэхдээ 
 * эдгээр талбаруудыг `optional` (сонголтот) болгож, зөвхөн шинэчлэх шаардлагатай өгөгдлийг илгээх боломжийг олгоно.
 */
export class UpdateEventDto extends PartialType(CreateEventDto) {}
