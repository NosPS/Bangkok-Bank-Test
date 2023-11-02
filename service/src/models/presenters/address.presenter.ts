import { GeoPresenter } from './geo.presenter';

type TGeo = Omit<GeoPresenter, 'id' | 'addressId'>;

type Props = {
  id: number;
  userId: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: TGeo;
};

export class AddressPresenter {
  id: number;
  userId: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: TGeo;

  constructor(props: Props) {
    this.id = props.id;
    this.userId = props.userId;
    this.street = props.street;
    this.suite = props.suite;
    this.city = props.city;
    this.zipcode = props.zipcode;
    this.geo = props.geo;
  }
}
