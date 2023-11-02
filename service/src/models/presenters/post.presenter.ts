import { PostEntity } from '../entities/post.entity';

export class PostPresenter extends PostEntity {
  constructor(postEntity: Omit<PostEntity, 'createdAt' | 'updatedAt'>) {
    super();
    this.id = postEntity.id;
    this.userId = postEntity.userId;
    this.title = postEntity.title;
    this.body = postEntity.body;
  }
}
