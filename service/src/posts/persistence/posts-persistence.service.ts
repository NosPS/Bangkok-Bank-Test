import { Injectable } from '@nestjs/common';
import { CreatePostDto } from 'src/models/dtos/create-post.dto';
import { PageOptionsDto } from 'src/models/dtos/page-options.dto';
import { PatchPostDto } from 'src/models/dtos/patch-post.dto';
import { UpdatePostDto } from 'src/models/dtos/update-post.dto';
import { PostEntity } from 'src/models/entities/post.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsPersistenceService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prisma.posts.create({
      data: {
        userId: createPostDto.userId,
        title: createPostDto.title,
        body: createPostDto.body,
      },
    });
  }

  findAll() {
    return this.prisma.posts.findMany();
  }

  findById(id: number) {
    return this.prisma.posts.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.posts.update({
      where: {
        id,
      },
      data: {
        userId: updatePostDto.userId,
        title: updatePostDto.title,
        body: updatePostDto.body,
      },
    });
  }

  patch(id: number, patchPostDto: PatchPostDto, post: PostEntity) {
    return this.prisma.posts.update({
      where: {
        id,
      },
      data: {
        userId: patchPostDto.userId ? patchPostDto.userId : post.userId,
        title: patchPostDto.title ? patchPostDto.title : post.title,
        body: patchPostDto.body ? patchPostDto.body : post.body,
      },
    });
  }

  delete(id: number) {
    return this.prisma.posts.delete({
      where: {
        id,
      },
    });
  }

  pagination(pageOptions: PageOptionsDto) {
    return this.prisma.posts.findMany({
      skip: (pageOptions.page - 1) * pageOptions.pageSize,
      take: +pageOptions.pageSize,
    });
  }

  count() {
    return this.prisma.posts.count();
  }

  findAllByUserId(userId: number) {
    return this.prisma.posts.findMany({
      where: {
        userId,
      },
    });
  }

  findUserById(userId: number) {
    return this.prisma.users.findUnique({
      where: {
        id: userId,
      },
      include: {
        address: {
          include: {
            geo: true,
          },
        },
        company: true,
      },
    });
  }
}
