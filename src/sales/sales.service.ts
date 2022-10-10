import { ConflictError } from './../common/errors/types/ConflictError';
import { NotFoundError } from './../common/errors/types/NotFoundError';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createSaleDto: CreateSaleDto) {
    await Promise.all(
      createSaleDto.orders.map(order =>
        this.validateQuantity(order.productId, order.quantity),
      ),
    );
    await Promise.all(
      createSaleDto.orders.map(order =>
        this.decrementProductQuantity(order.productId, order.quantity),
      ),
    );
    const total = await Promise.all(
      createSaleDto.orders.map(order =>
        this.calculateTotal(order.productId, order.quantity),
      ),
    );
    return this.prismaService.sale.create({
      data: {
        userId: createSaleDto.userId,
        paymentMethod: createSaleDto.paymentMethod,
        total: total.reduce((accumulator, curr) => accumulator + curr, 0),
        orders: { create: createSaleDto.orders },
      },
    });
  }

  public async findAll() {
    return this.prismaService.sale.findMany({ include: { orders: true } });
  }

  public async findOne(id: number) {
    const sale = await this.prismaService.sale.findUnique({
      where: { id },
      include: { orders: true },
    });
    if (!sale) throw new NotFoundError('Sale not found');
    return sale;
  }

  public async update(id: number, updateSaleDto: UpdateSaleDto) {
    await this.findOne(id);
    return this.prismaService.sale.update({
      where: { id },
      data: updateSaleDto,
    });
  }

  public async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.sale.delete({ where: { id } });
  }

  private async validateQuantity(id: number, quantity: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundError(`Product #${id} not found`);
    if (product.quantity < quantity)
      throw new ConflictError(
        `Product #${id} does not have this quantity in stock`,
      );
    return product;
  }

  private async calculateTotal(id: number, quantity: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    return product.value * quantity;
  }

  private async decrementProductQuantity(id: number, quantity: number) {
    return this.prismaService.product.update({
      where: { id },
      data: { quantity: { decrement: quantity } },
    });
  }
}
