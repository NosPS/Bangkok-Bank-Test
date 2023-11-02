import { PageOptionsDto } from '../dtos/page-options.dto';

export class PageMetaPresenter {
  page: number;
  pageSize: number;
  count: number;

  constructor(count: number, pageOptions: PageOptionsDto) {
    this.page = pageOptions.page;
    this.pageSize = pageOptions.pageSize;
    this.count = count;
  }
}
