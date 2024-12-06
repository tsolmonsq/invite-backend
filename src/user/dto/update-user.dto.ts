import {
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Length
  } from 'class-validator';
  
export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(100)
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(8)
    phoneNumber: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(50)
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(50)
    lastName: string;
  
    @IsNotEmpty()
    @IsStrongPassword()
    @Length(100)
    password: string;

}
  