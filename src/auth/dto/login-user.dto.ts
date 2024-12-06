import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length
} from 'class-validator';

export class LoginUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(100)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(100)
    password: string;
}
