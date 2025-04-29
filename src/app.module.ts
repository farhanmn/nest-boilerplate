import { Module } from '@nestjs/common';
import { UsersModule } from './common/resources/users/users.module';
import { AuthModule } from './common/resources/auth/auth.module';
import { UserController } from './common/resources/users/user.controller';

@Module({
  imports: [
    UsersModule,
    AuthModule
    // other modules
  ],
  controllers: [UserController]
})
export class AppModule {}
