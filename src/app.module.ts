import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
