import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserCredentials } from 'src/users/dto/user-credentials.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
 constructor(private usersService: UsersService) {}

 async handleLogin(userCredentials: UserCredentials): Promise<User> {
  const user = await this.usersService.getUser(userCredentials.googleId);

  if (user) {
    // generate and return token
    return user;
  }

  // create user and generate and return token
  const newUser = await this.usersService.createUser(userCredentials);
  return newUser;
 }
}
