import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { keys } from "../config/keys";
import { UsersService } from '../users/users.service';
import { JwtPayload } from "./model/jwt.model";
import { User } from "src/users/user.entity";
import { UnauthorizedException, Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: keys.jwtSecret,
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<User> {
    const { googleId } = jwtPayload;
    const user = await this.usersService.getUser(googleId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}