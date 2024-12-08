import { IsNotEmpty, IsString, IsEmail, Length, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGuestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  eventId: number; 
}
