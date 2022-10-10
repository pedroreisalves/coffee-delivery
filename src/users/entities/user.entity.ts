import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  role: Role;
  password: string;
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  postalCode: string;
  additionalInformation: string;
}
