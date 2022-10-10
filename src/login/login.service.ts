import { AuthService } from './../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class LoginService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  public async login(loginDto: LoginDto) {
    const payload = await this.validateLogin(loginDto);
    const token = await this.authService.createAccessToken(payload);
    return { token };
  }

  private async validateLogin(loginDto: LoginDto) {
    const user = await this.prismaService.user.findFirst({
      where: { email: loginDto.email },
    });
    if (!user) throw new NotFoundError('Invalid credentials');
    const match = await bcrypt.compare(loginDto.password, user.password);
    if (!match) throw new NotFoundError('Invalid credentials');
    return { id: user.id, role: user.role };
  }
}
