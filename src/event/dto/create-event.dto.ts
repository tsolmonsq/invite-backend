import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()  
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty()  
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  organizer: string;

  @ApiProperty()  
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @ApiProperty()  
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  image: string;

  @ApiProperty()  
  @IsNotEmpty()
  @IsDateString()
  @Length(1, 100)
  startDate: string;

  @ApiProperty()  
  @IsNotEmpty()
  @IsDateString()
  @Length(1, 100)
  endDate: string;
}
