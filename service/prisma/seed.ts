import { PrismaClient } from '@prisma/client';
import { PostPresenter } from 'src/models/presenters/post.presenter';
import { UserPresenter } from 'src/models/presenters/user.presenter';
import axios from 'axios';

const prisma = new PrismaClient();

export async function seed() {
  try {
    const tableNames = ['users', 'posts', 'addresses', 'geos', 'companies'];

    tableNames.forEach(async (tableName) => {
      await prisma.$queryRawUnsafe(
        `Truncate "${tableName}" restart identity cascade;`,
      );
    });

    const users = (
      await axios.get('https://jsonplaceholder.typicode.com/users')
    ).data;

    users.forEach(async (user: UserPresenter) => {
      await prisma.users.create({
        data: {
          name: user.name,
          username: user.username,
          email: user.email,
          address: {
            create: {
              street: user.address.street,
              suite: user.address.suite,
              city: user.address.city,
              zipcode: user.address.zipcode,
              geo: {
                create: {
                  lat: user.address.geo.lat,
                  lng: user.address.geo.lng,
                },
              },
            },
          },
          phone: user.phone,
          website: user.website,
          company: {
            create: {
              name: user.company.name,
              catchPhrase: user.company.catchPhrase,
              bs: user.company.bs,
            },
          },
        },
      });
    });

    const posts = (
      await axios.get('https://jsonplaceholder.typicode.com/posts')
    ).data;

    posts.forEach(async (post: PostPresenter) => {
      await prisma.posts.create({
        data: {
          userId: post.userId,
          title: post.title,
          body: post.body,
        },
      });
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
