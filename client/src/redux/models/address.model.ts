import GeoModel from "./geo.model";

type Props = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoModel;
};

class AddressModel {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoModel;

  constructor(props: Props) {
    this.street = props.street;
    this.suite = props.suite;
    this.city = props.city;
    this.zipcode = props.zipcode;
    this.geo = props.geo;
  }
}

export default AddressModel;
