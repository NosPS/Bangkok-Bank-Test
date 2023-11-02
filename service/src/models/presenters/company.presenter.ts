type Props = {
  id: number;
  userId: number;
  name: string;
  catchPhrase: string;
  bs: string;
};

export class CompanyPresenter {
  id: number;
  userId: number;
  name: string;
  catchPhrase: string;
  bs: string;

  constructor(props: Props) {
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.catchPhrase = props.catchPhrase;
    this.bs = props.bs;
  }
}
