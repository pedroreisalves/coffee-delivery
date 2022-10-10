import { Role } from '@prisma/client';

export interface JwtPayload {
  role: Role;
  id: number;
}
