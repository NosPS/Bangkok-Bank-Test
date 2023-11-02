type Props = {
  accessToken: string;
  refreshToken: string;
};

export class TokenResponsePresenter {
  accessToken: string;
  refreshToken: string;

  constructor(props: Props) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
  }
}
