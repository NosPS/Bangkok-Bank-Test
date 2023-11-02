import { Module } from '@nestjs/common';
import { UsersPersistenceService } from './users-persistence.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersPersistenceService],
  exports: [UsersPersistenceService],
})
export class UsersPersistenceModule {}
