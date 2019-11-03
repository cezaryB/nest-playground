import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { UserCredentials } from './dto/user-credentials.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userCredentials: UserCredentials) {
    const { email, googleId } = userCredentials;
    const user = new User();
    
    user.email = email;
    user.googleId = googleId;

    try {
      return await user.save();
    } catch(e) {
      throw new InternalServerErrorException();
    }
  }
}
