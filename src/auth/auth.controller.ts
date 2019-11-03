import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

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
  signInCallback(@Req() req) {
    // handles the Google OAuth2 callback
    this.authService.handleLogin(req.user);
  }
}
