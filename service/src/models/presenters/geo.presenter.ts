type Props = {
  id: number;
  addressId: number;
  lat: string;
  lng: string;
};

export class GeoPresenter {
  id: number;
  addressId: number;
  lat: string;
  lng: string;

  constructor(props: Props) {
    this.id = props.id;
    this.addressId = props.addressId;
    this.lat = props.lat;
    this.lng = props.lng;
  }
}
