import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserCredentials } from 'src/users/dto/user-credentials.dto';
import { AccessToken, JwtPayload} from './model/jwt.model';

@Injectable()
export class AuthService {
 constructor(
   private usersService: UsersService,
   private JwtService: JwtService,
  ) {}

 async handleLogin(userCredentials: UserCredentials): Promise<AccessToken> {
  let user = await this.usersService.getUser(userCredentials.googleId);

  if (!user) {
    user = await this.usersService.createUser(userCredentials);
  }

  const jwtPayload: JwtPayload = { googleId: user.googleId };
  const accessToken = this.JwtService.sign(jwtPayload);

  return { accessToken };
 }
}
