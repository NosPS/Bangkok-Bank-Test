type Props = {
  status: boolean;
  message: string;
};

class SuccessModel {
  status: boolean;
  message: string;

  constructor(props: Props) {
    this.status = props.status;
    this.message = props.message;
  }
}

export default SuccessModel;
