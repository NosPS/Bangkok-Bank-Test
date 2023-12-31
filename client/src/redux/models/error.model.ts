type Props = {
  status: boolean;
  message: string;
};

class ErrorModel {
  status: boolean;
  message: string;

  constructor(props: Props) {
    this.status = props.status;
    this.message = props.message;
  }
}

export default ErrorModel;
