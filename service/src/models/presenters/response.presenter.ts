type Props = {
  statusCode: number;
  message: string;
};

export class ResponsePresenter {
  statusCode: number;
  message: string;

  constructor(props: Props) {
    this.statusCode = props.statusCode;
    this.message = props.message;
  }
}
