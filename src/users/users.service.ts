import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserCredentials } from './dto/user-credentials.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  async getUser(googleId: string): Promise<User> {
    return this.userRepository.findOne({ googleId });
  }

  async createUser(userCredentials: UserCredentials): Promise<User> {
    const user = await this.userRepository.createUser(userCredentials);
    return user;
  }
}
