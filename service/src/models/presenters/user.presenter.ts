import { AddressPresenter } from './address.presenter';
import { CompanyPresenter } from './company.presenter';

type TAddress = Omit<AddressPresenter, 'id' | 'userId'>;
type TCompany = Omit<CompanyPresenter, 'id' | 'userId'>;

type Props = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: TAddress;
  phone: string;
  website: string;
  company: TCompany;
};

export class UserPresenter {
  id: number;
  name: string;
  username: string;
  email: string;
  address: TAddress;
  phone: string;
  website: string;
  company: TCompany;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.username = props.username;
    this.email = props.email;
    this.address = props.address;
    this.phone = props.phone;
    this.website = props.website;
    this.company = props.company;
  }
}
