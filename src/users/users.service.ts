import * as bcrypt from 'bcrypt';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.prismaService.user.create({ data: createUserDto });
  }

  public async findAll() {
    return this.prismaService.user.findMany();
  }

  public async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  public async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.user.delete({ where: { id } });
  }
}
