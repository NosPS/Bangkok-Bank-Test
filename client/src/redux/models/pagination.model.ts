type Props = {
  pageSize: number;
  page: number;
};

export class PaginationModel {
  pageSize: number;
  page: number;

  constructor(props: Props) {
    this.pageSize = props.pageSize;
    this.page = props.page;
  }
}
