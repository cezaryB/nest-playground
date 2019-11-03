import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule
  ],
  providers: [
    AuthService,
    GoogleStrategy,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
