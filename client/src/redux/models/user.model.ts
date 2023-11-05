import AddressModel from "./address.model";
import CompanyModel from "./company.model";

type Props = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressModel;
  phone: string;
  website: string;
  company: CompanyModel;
};

class UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressModel;
  phone: string;
  website: string;
  company: CompanyModel;

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

export default UserModel;
