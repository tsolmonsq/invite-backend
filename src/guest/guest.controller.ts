import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/ create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Controller('guests')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post()
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestService.create(createGuestDto);
  }

  @Get()
  findAll() {
    return this.guestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.guestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGuestDto: UpdateGuestDto) {
    return this.guestService.update(id, updateGuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.guestService.remove(id);
  }
}
