import { AddressEntity } from './address.entity';
import { CompanyEntity } from './company.entity';

export class UserEntity {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressEntity;
  phone: string;
  website: string;
  company: CompanyEntity;
  createdAt: Date;
  updatedAt: Date;
}
