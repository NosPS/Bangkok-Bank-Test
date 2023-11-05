type Props = {
  lat: string;
  lng: string;
};

class GeoModel {
  lat: string;
  lng: string;

  constructor(props: Props) {
    this.lat = props.lat;
    this.lng = props.lng;
  }
}

export default GeoModel;
