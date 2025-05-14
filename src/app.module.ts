import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserController } from './modules/users/user.controller';

@Module({
  imports: [
    UsersModule,
    AuthModule
    // other modules
  ],
  controllers: [UserController]
})
export class AppModule {}
