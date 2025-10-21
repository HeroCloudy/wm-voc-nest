import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { TwitterSnowflake } from '@sapphire/snowflake';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userData: UserDto) {
    const user: Partial<User> = {
      id: `${TwitterSnowflake.generate()}`,
      ...userData,
    };
    await this.userRepository.save(user);
    return user;
  }

  async findOne(username: string, password: string) {
    return await this.userRepository.findOne({
      where: { username, password },
    });
  }
}
