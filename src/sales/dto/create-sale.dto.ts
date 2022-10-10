import { PaymentMethod } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

export class Order {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateSaleDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Order)
  orders: Order[];

  @IsEnum(PaymentMethod, {
    message: 'paymentMethod must be "CREDIT_CARD", "DEBIT_CARD" or "MONEY"',
  })
  paymentMethod: PaymentMethod;
}
