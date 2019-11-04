import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AccessToken } from './model/jwt.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/signin')
  @UseGuards(AuthGuard('google'))
  signIn() {
    // initiates the Google OAuth2 login flow
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  signInCallback(@Req() req): Promise<AccessToken> {
    // handles the Google OAuth2 callback
    return this.authService.handleLogin(req.user);
  }

  // route for testing jwt token authorization
  @Get('/test')
  @UseGuards(AuthGuard('jwt'))
  testCallback() {
    return 'You should only see this if JWT token was provided';
  }
}
