import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersPersistenceModule } from './persistence/users-persistence.module';

@Module({
  imports: [UsersPersistenceModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
