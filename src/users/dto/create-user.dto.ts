import { Role } from '@prisma/client';
import {
  IsByteLength,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPostalCode,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsEnum(Role, { message: 'Role must be "ADMIN" or "COMMON"' })
  role: Role;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsByteLength(11, 11, {
    message: 'The phone number must be 11 characters long',
  })
  phoneNumber: string;

  @IsPostalCode('BR')
  postalCode: string;

  @IsNumber()
  @Min(1)
  houseNumber: number;

  @IsString()
  @IsOptional()
  additionalInformation: string;
}
