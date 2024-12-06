import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(100)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8)
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(50)
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(50)
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword()
    @Length(100)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword()
    @Length(100)
    passwordConfirmation: string;
}
