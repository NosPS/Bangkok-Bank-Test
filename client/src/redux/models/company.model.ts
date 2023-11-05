type Props = {
  name: string;
  catchPhrase: string;
  bs: string;
};

class CompanyModel {
  name: string;
  catchPhrase: string;
  bs: string;

  constructor(props: Props) {
    this.name = props.name;
    this.catchPhrase = props.catchPhrase;
    this.bs = props.bs;
  }
}

export default CompanyModel;
