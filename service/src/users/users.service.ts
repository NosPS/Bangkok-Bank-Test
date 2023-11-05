import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/models/dtos/create-user.dto';
import { PageMetaPresenter } from 'src/models/presenters/page-meta.presenter';
import { PageOptionsDto } from 'src/models/dtos/page-options.dto';
import { PagePresenter } from 'src/models/presenters/page.presenter';
import { PatchUserDto } from 'src/models/dtos/patch-user.dto';
import { UpdateUserDto } from 'src/models/dtos/update-user.dto';
import { UserEntity } from 'src/models/entities/user.entity';
import { UserMapping } from 'src/models/mappings/user.mapping';
import { ResponsePresenter } from 'src/models/presenters/response.presenter';
import { UserPresenter } from 'src/models/presenters/user.presenter';
import { PostPresenter } from 'src/models/presenters/post.presenter';
import { PostMapping } from 'src/models/mappings/post.mapping';
import { GetErrorMessage } from 'src/utils/get-error-message.util';
import { UsersPersistenceService } from './persistence/users-persistence.service';

@Injectable()
export class UsersService {
  private createdSuccessMesssage = 'User created success';
  private updatedSuccessMesssage = 'User updated success';
  private deletedSuccessMesssage = 'User deleted success';
  private notFoundMessage = 'User not found';

  constructor(private usersPersistence: UsersPersistenceService) {}

  async create(createUserDto: CreateUserDto): Promise<ResponsePresenter> {
    try {
      await this.usersPersistence.create(createUserDto);

      const response = new ResponsePresenter({
        statusCode: HttpStatus.CREATED,
        message: this.createdSuccessMesssage,
      });
      return response;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async findAll(): Promise<UserPresenter[]> {
    try {
      const users: UserEntity[] = await this.usersPersistence.findAll();

      const usersPresenter = UserMapping.mapToPresenterArray(users);
      return usersPresenter;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async findOne(id: number): Promise<UserPresenter> {
    try {
      const user = await this.usersPersistence.findById(id);

      if (!user) {
        throw new NotFoundException(this.notFoundMessage);
      }

      const userPresenter = UserMapping.mapToPresenter(user);
      return userPresenter;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponsePresenter> {
    try {
      const user = await this.usersPersistence.findById(id);

      if (!user) {
        throw new NotFoundException(this.notFoundMessage);
      }

      await this.usersPersistence.update(id, updateUserDto);

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
    patchUserDto: PatchUserDto,
  ): Promise<ResponsePresenter> {
    try {
      const user = await this.usersPersistence.findById(id);

      if (!user) {
        throw new NotFoundException(this.notFoundMessage);
      }

      await this.usersPersistence.patch(id, patchUserDto, user);

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
      const user = await this.usersPersistence.findById(id);

      if (!user) {
        throw new NotFoundException(this.notFoundMessage);
      }

      if (user.address.geo) {
        await this.usersPersistence.deleteGeo(user.address.id);
      }

      if (user.address) {
        await this.usersPersistence.deleteAddress(user.id);
      }

      if (user.company) {
        await this.usersPersistence.deleteCompany(user.id);
      }

      await this.usersPersistence.deletePosts(user.id);

      await this.usersPersistence.delete(user.id);

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
  ): Promise<PagePresenter<UserPresenter>> {
    try {
      const users = await this.usersPersistence.pagination(pageOptions);

      const count = await this.usersPersistence.count();

      const usersPresenter = UserMapping.mapToPresenterArray(users);

      let pageMeta = new PageMetaPresenter(count, pageOptions);
      let page = new PagePresenter(usersPresenter, pageMeta);

      return page;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async findAllPostsById(id: number): Promise<PostPresenter[]> {
    try {
      const user = await this.usersPersistence.findById(id);

      if (!user) {
        throw new NotFoundException(this.notFoundMessage);
      }

      const posts = await this.usersPersistence.findAllPostsById(user.id);

      const postsPresenter = PostMapping.mapToPresenterArray(posts);
      return postsPresenter;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }
}
