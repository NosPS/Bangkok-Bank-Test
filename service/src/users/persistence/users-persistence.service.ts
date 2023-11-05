import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/models/dtos/create-user.dto';
import { PageOptionsDto } from 'src/models/dtos/page-options.dto';
import { PatchUserDto } from 'src/models/dtos/patch-user.dto';
import { UpdateUserDto } from 'src/models/dtos/update-user.dto';
import { UserEntity } from 'src/models/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersPersistenceService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: {
        name: createUserDto.name,
        username: createUserDto.username,
        email: createUserDto.email,
        address: {
          create: {
            street: createUserDto.address.street,
            suite: createUserDto.address.suite,
            city: createUserDto.address.city,
            zipcode: createUserDto.address.zipcode,
            geo: {
              create: {
                lat: createUserDto.address.geo.lat,
                lng: createUserDto.address.geo.lng,
              },
            },
          },
        },
        phone: createUserDto.phone,
        website: createUserDto.website,
        company: {
          create: {
            name: createUserDto.company.name,
            catchPhrase: createUserDto.company.catchPhrase,
            bs: createUserDto.company.bs,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.users.findMany({
      include: {
        address: {
          include: {
            geo: true,
          },
        },
        company: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  findById(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: {
        id,
      },
      data: {
        name: updateUserDto.name,
        username: updateUserDto.username,
        email: updateUserDto.email,
        address: {
          update: {
            street: updateUserDto.address.street,
            suite: updateUserDto.address.suite,
            city: updateUserDto.address.city,
            zipcode: updateUserDto.address.zipcode,
            geo: {
              update: {
                lat: updateUserDto.address.geo.lat,
                lng: updateUserDto.address.geo.lng,
              },
            },
          },
        },
        phone: updateUserDto.phone,
        website: updateUserDto.website,
        company: {
          update: {
            name: updateUserDto.company.name,
            catchPhrase: updateUserDto.company.catchPhrase,
            bs: updateUserDto.company.bs,
          },
        },
      },
    });
  }

  patch(id: number, patchUserDto: PatchUserDto, user: UserEntity) {
    return this.prisma.users.update({
      where: {
        id,
      },
      data: {
        name: patchUserDto.name ? patchUserDto.name : user.name,
        username: patchUserDto.username ? patchUserDto.username : user.username,
        email: patchUserDto.email ? patchUserDto.email : user.email,
        address: patchUserDto.address
          ? {
              update: {
                street: patchUserDto.address.street
                  ? patchUserDto.address.street
                  : user.address.street,
                suite: patchUserDto.address.suite
                  ? patchUserDto.address.suite
                  : user.address.suite,
                city: patchUserDto.address.city
                  ? patchUserDto.address.city
                  : user.address.city,
                zipcode: patchUserDto.address.zipcode
                  ? patchUserDto.address.zipcode
                  : user.address.zipcode,
                geo: patchUserDto.address.geo
                  ? {
                      update: {
                        lat: patchUserDto.address.geo.lat
                          ? patchUserDto.address.geo.lat
                          : user.address.geo.lat,
                        lng: patchUserDto.address.geo.lng
                          ? patchUserDto.address.geo.lng
                          : user.address.geo.lng,
                      },
                    }
                  : {},
              },
            }
          : {},
        phone: patchUserDto.phone ? patchUserDto.phone : user.phone,
        website: patchUserDto.website ? patchUserDto.website : user.website,
        company: patchUserDto.company
          ? {
              update: {
                name: patchUserDto.company.name
                  ? patchUserDto.company.name
                  : user.company.name,
                catchPhrase: patchUserDto.company.catchPhrase
                  ? patchUserDto.company.catchPhrase
                  : user.company.catchPhrase,
                bs: patchUserDto.company.bs
                  ? patchUserDto.company.bs
                  : user.company.bs,
              },
            }
          : {},
      },
    });
  }

  delete(id: number) {
    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }

  deleteGeo(addressId: number) {
    return this.prisma.geos.delete({
      where: {
        addressId,
      },
    });
  }

  deleteAddress(userId: number) {
    return this.prisma.addresses.delete({
      where: {
        userId,
      },
    });
  }

  deleteCompany(userId: number) {
    return this.prisma.companies.delete({
      where: {
        userId,
      },
    });
  }

  deletePosts(userId: number) {
    return this.prisma.posts.deleteMany({
      where: {
        userId,
      },
    });
  }

  pagination(pageOptions: PageOptionsDto) {
    return this.prisma.users.findMany({
      skip: (pageOptions.page - 1) * pageOptions.pageSize,
      take: +pageOptions.pageSize,
      include: {
        address: {
          include: {
            geo: true,
          },
        },
        company: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  count() {
    return this.prisma.users.count();
  }

  findAllPostsById(userId: number) {
    return this.prisma.posts.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
