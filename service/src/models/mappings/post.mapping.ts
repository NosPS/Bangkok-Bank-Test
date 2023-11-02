import { PostEntity } from '../entities/post.entity';
import { PostPresenter } from '../presenters/post.presenter';

export class PostMapping {
  static mapToPresenter(postEntity: PostEntity): PostPresenter {
    return new PostPresenter(postEntity);
  }

  static mapToPresenterArray(postEntities: PostEntity[]): PostPresenter[] {
    const postsPresenter = [];
    postEntities.forEach((postEntity) => {
      postsPresenter.push(this.mapToPresenter(postEntity));
    });
    return postsPresenter;
  }
}
