import { NotFoundError } from './../common/errors/types/NotFoundError';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({ data: createCategoryDto });
  }

  public async findAll() {
    return this.prismaService.category.findMany();
  }

  public async findOne(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundError('Category not found');
    return category;
  }

  public async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    return this.prismaService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  public async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.category.delete({ where: { id } });
  }
}
