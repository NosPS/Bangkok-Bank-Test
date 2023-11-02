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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/models/dtos/page-options.dto';
import { Public } from 'src/middlewares/decorators/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Public()
  findAll(@Query() pageOptions: PageOptionsDto) {
    if (pageOptions.page && pageOptions.pageSize) {
      return this.usersService.pagination(pageOptions);
    } else {
      return this.usersService.findAll();
    }
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':id/posts')
  @Public()
  findAllPostsById(@Param('id') id: string) {
    return this.usersService.findAllPostsById(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  patch(@Param('id') id: string, @Body() patchUserDto: PatchUserDto) {
    return this.usersService.patch(+id, patchUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
