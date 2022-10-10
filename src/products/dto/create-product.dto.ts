import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsUrl()
  image: string;

  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(1)
  value: number;

  @IsNumber()
  @IsOptional()
  categoryId: number;
}
