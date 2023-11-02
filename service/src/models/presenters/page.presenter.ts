import { PageMetaPresenter } from './page-meta.presenter';

export class PagePresenter<T> {
  data: T[];
  meta: PageMetaPresenter;

  constructor(data: T[], meta: PageMetaPresenter) {
    this.data = data;
    this.meta = meta;
  }
}
