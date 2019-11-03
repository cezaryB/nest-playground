import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { keys } from '../config/keys';
import { routes } from '../config/routes';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: routes.googleCallback,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    })
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: Function) {
    try {
      // I assume that here we are creating new user / changing active flag to true
      done(null, { 
        email: profile.emails[0].value,
        googleId: profile.id,
      });
    } catch (e) {
      done(e);
    }
  }
}
