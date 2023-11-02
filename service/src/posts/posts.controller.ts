import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from '../models/dtos/create-post.dto';
import { UpdatePostDto } from '../models/dtos/update-post.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/models/dtos/page-options.dto';
import { PatchPostDto } from 'src/models/dtos/patch-post.dto';
import { Public } from 'src/middlewares/decorators/public.decorator';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @Public()
  @ApiQuery({ name: 'userId', required: false })
  findAll(
    @Query() pageOptions: PageOptionsDto,
    @Query('userId') userId?: string,
  ) {
    if (pageOptions.page && pageOptions.pageSize) {
      return this.postsService.pagination(pageOptions);
    } else if (pageOptions.page && pageOptions.pageSize && userId) {
      return this.postsService.paginationByUserId(pageOptions, +userId);
    } else if (userId) {
      return this.postsService.findAllByUserId(+userId);
    } else {
      return this.postsService.findAll();
    }
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Get(':id/users')
  @Public()
  findUserById(@Param('id') id: string) {
    return this.postsService.findUserById(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  patch(@Param('id') id: string, @Body() patchPostDto: PatchPostDto) {
    return this.postsService.patch(+id, patchPostDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
