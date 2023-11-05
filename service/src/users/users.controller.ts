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
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/models/dtos/create-user.dto';
import { UpdateUserDto } from 'src/models/dtos/update-user.dto';
import { PatchUserDto } from 'src/models/dtos/patch-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PageOptionsDto } from 'src/models/dtos/page-options.dto';
import { Public } from 'src/middlewares/decorators/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Success.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'create a user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Public()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
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
  @ApiOperation({ summary: 'get all users or pagination' })
  findAll(@Query() pageOptions: PageOptionsDto) {
    if (pageOptions.page && pageOptions.pageSize) {
      return this.usersService.pagination(pageOptions);
    } else {
      return this.usersService.findAll();
    }
  }

  @Get(':id')
  @Public()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'get a user by id' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':id/posts')
  @Public()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'get all posts by user id' })
  findAllPostsById(@Param('id') id: string) {
    return this.usersService.findAllPostsById(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'update a user' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'patch a user' })
  patch(@Param('id') id: string, @Body() patchUserDto: PatchUserDto) {
    return this.usersService.patch(+id, patchUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'delete a user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
