import { PaymentMethod } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateSaleDto {
  @IsNumber()
  @IsOptional()
  userId: number;

  @IsEnum(PaymentMethod, {
    message: 'paymentMethod must be "CREDIT_CARD", "DEBIT_CARD" or "MONEY"',
  })
  @IsOptional()
  paymentMethod: PaymentMethod;
}
