import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  email: string;
  role: Role;
  password: string;
  id: number;
  name: string;
  phoneNumber: string;
  postalCode: string;
  additionalInformation: string;
  houseNumber: number;
}
