import { GeoEntity } from './geo.entity';

export class AddressEntity {
  id: number;
  userId: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoEntity;
  createdAt: Date;
  updatedAt: Date;
}
