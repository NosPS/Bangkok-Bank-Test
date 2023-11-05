import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from '../models/dtos/create-post.dto';
import { UpdatePostDto } from '../models/dtos/update-post.dto';
import { ResponsePresenter } from 'src/models/presenters/response.presenter';
import { PostEntity } from 'src/models/entities/post.entity';
import { PostMapping } from 'src/models/mappings/post.mapping';
import { PatchPostDto } from 'src/models/dtos/patch-post.dto';
import { PageOptionsDto } from 'src/models/dtos/page-options.dto';
import { PagePresenter } from 'src/models/presenters/page.presenter';
import { PostPresenter } from 'src/models/presenters/post.presenter';
import { PageMetaPresenter } from 'src/models/presenters/page-meta.presenter';
import { UserMapping } from 'src/models/mappings/user.mapping';
import { UserPresenter } from 'src/models/presenters/user.presenter';
import { GetErrorMessage } from 'src/utils/get-error-message.util';
import { PostsPersistenceService } from './persistence/posts-persistence.service';

@Injectable()
export class PostsService {
  private createdSuccessMesssage = 'Post created success';
  private updatedSuccessMesssage = 'Post updated success';
  private deletedSuccessMesssage = 'Post deleted success';
  private notFoundMessage = 'Post not found';
  private userNotFoundMessage = 'User not found';

  constructor(private postsPersistence: PostsPersistenceService) {}

  async create(createPostDto: CreatePostDto): Promise<ResponsePresenter> {
    try {
      const user = await this.postsPersistence.findUserById(
        createPostDto.userId,
      );

      if (!user) {
        throw new NotFoundException(this.userNotFoundMessage);
      }

      await this.postsPersistence.create(createPostDto);

      const response = new ResponsePresenter({
        statusCode: HttpStatus.CREATED,
        message: this.createdSuccessMesssage,
      });
      return response;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async findAll(): Promise<PostPresenter[]> {
    try {
      const posts: PostEntity[] = await this.postsPersistence.findAll();

      const postsPresenter = PostMapping.mapToPresenterArray(posts);
      return postsPresenter;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async findOne(id: number): Promise<PostPresenter> {
    try {
      const post = await this.postsPersistence.findById(id);

      if (!post) {
        throw new NotFoundException(this.notFoundMessage);
      }

      const postPresenter = PostMapping.mapToPresenter(post);
      return postPresenter;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<ResponsePresenter> {
    try {
      const post = await this.postsPersistence.findById(id);

      if (!post) {
        throw new NotFoundException(this.notFoundMessage);
      }

      await this.postsPersistence.update(id, updatePostDto);

      const response = new ResponsePresenter({
        statusCode: HttpStatus.OK,
        message: this.updatedSuccessMesssage,
      });
      return response;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async patch(
    id: number,
    patchPostDto: PatchPostDto,
  ): Promise<ResponsePresenter> {
    try {
      const post = await this.postsPersistence.findById(id);

      if (!post) {
        throw new NotFoundException(this.notFoundMessage);
      }

      await this.postsPersistence.patch(id, patchPostDto, post);

      const response = new ResponsePresenter({
        statusCode: HttpStatus.OK,
        message: this.updatedSuccessMesssage,
      });
      return response;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async remove(id: number): Promise<ResponsePresenter> {
    try {
      const post = await this.postsPersistence.findById(id);

      if (!post) {
        throw new NotFoundException(this.notFoundMessage);
      }

      await this.postsPersistence.delete(id);

      const response = new ResponsePresenter({
        statusCode: HttpStatus.OK,
        message: this.deletedSuccessMesssage,
      });
      return response;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async pagination(
    pageOptions: PageOptionsDto,
  ): Promise<PagePresenter<PostPresenter>> {
    try {
      const posts: PostEntity[] = await this.postsPersistence.pagination(
        pageOptions,
      );

      const count = await this.postsPersistence.count();

      const postsPresenter = PostMapping.mapToPresenterArray(posts);

      let pageMeta = new PageMetaPresenter(count, pageOptions);
      let page = new PagePresenter(postsPresenter, pageMeta);

      return page;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async findAllByUserId(userId: number): Promise<PostPresenter[]> {
    try {
      const user = await this.postsPersistence.findUserById(userId);

      if (!user) {
        throw new NotFoundException(this.userNotFoundMessage);
      }

      const posts = await this.postsPersistence.findAllByUserId(user.id);
      const postsPresenter = PostMapping.mapToPresenterArray(posts);
      return postsPresenter;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async paginationByUserId(
    pageOptions: PageOptionsDto,
    userId: number,
  ): Promise<PagePresenter<PostPresenter>> {
    try {
      const user = await this.postsPersistence.findUserById(userId);

      if (!user) {
        throw new NotFoundException(this.userNotFoundMessage);
      }

      const posts = await this.postsPersistence.findAllByUserId(user.id);

      const count = posts.length;

      const postsSlice = posts.slice(
        (pageOptions.page - 1) * pageOptions.pageSize,
        (pageOptions.page - 1) * pageOptions.pageSize + pageOptions.pageSize,
      );

      const postsPresenter = PostMapping.mapToPresenterArray(postsSlice);

      let pageMeta = new PageMetaPresenter(count, pageOptions);
      let page = new PagePresenter(postsPresenter, pageMeta);

      return page;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async findUserById(id: number): Promise<UserPresenter> {
    try {
      const post = await this.postsPersistence.findById(id);

      if (!post) {
        throw new NotFoundException(this.notFoundMessage);
      }

      const user = await this.postsPersistence.findUserById(post.userId);

      if (!user) {
        throw new NotFoundException(this.userNotFoundMessage);
      }

      const userPresenter = UserMapping.mapToPresenter(user);
      return userPresenter;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }
}
