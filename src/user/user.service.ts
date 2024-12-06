import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      return this.userRepository.save(user);
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Unable to create user.');
    }
  }
  

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user || null; // Return null instead of throwing an exception
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(`${id} ID-тай хэрэглэгч олдсонгүй.`);
    }
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`${id} ID-тай хэрэглэгч олдсонгүй.`);
    }
  }
}
