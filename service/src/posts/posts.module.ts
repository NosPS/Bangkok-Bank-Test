import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsPersistenceModule } from './persistence/posts-persistence.module';

@Module({
  imports: [PostsPersistenceModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
