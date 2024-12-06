import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
  import { UserService } from './user.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { User } from './entities/user.entity';
  
  @ApiTags('Users')
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Get(':email')
    findByEmail(@Param('email') email: string): Promise<User> {
      return this.userService.findByEmail(email);
    }
  
    @Get()
    findAll(): Promise<User[]> {
      return this.userService.findAll();
    }
  
    @Put(':id')
    update(
      @Param('id') id: number,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
      return this.userService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
      return this.userService.delete(id);
    }
  }
  