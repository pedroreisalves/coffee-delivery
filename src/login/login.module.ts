import { AuthModule } from './../auth/auth.module';
import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

@Module({
  imports: [AuthModule],
  controllers: [LoginController],
  providers: [LoginService, PrismaService],
})
export class LoginModule {}
