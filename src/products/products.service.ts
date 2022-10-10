import { NotFoundError } from './../common/errors/types/NotFoundError';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({ data: createProductDto });
  }

  public async findAll() {
    return this.prismaService.product.findMany({ include: { category: true } });
  }

  public async findOne(id: number) {
    const product = await this.prismaService.product.findFirst({
      where: { id },
      include: { category: true },
    });
    if (!product) throw new NotFoundError('Product not found');
    return product;
  }

  public async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  public async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.product.delete({ where: { id } });
  }
}
