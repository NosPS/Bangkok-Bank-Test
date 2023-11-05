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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PageOptionsDto } from 'src/models/dtos/page-options.dto';
import { PatchPostDto } from 'src/models/dtos/patch-post.dto';
import { Public } from 'src/middlewares/decorators/public.decorator';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Success.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'create a post' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @Public()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'used for pagination',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'used for pagination',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'used for get all posts by user id',
  })
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({
    summary: 'get all posts, pagination, or get all posts by userId',
  })
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
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'get a post by id' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Get(':id/users')
  @Public()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiResponse({
    status: 404,
    description: 'Post or User not found.',
  })
  @ApiOperation({ summary: 'get a user by post id' })
  findUserById(@Param('id') id: string) {
    return this.postsService.findUserById(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'update a post' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'patch a post' })
  patch(@Param('id') id: string, @Body() patchPostDto: PatchPostDto) {
    return this.postsService.patch(+id, patchPostDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'delete a post' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
