import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: number;
  image: string;
  title: string;
  description: string;
  quantity: number;
  value: number;
  categoryId: number;
}
