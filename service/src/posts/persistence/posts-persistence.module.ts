import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostsPersistenceService } from './posts-persistence.service';

@Module({
  imports: [PrismaModule],
  providers: [PostsPersistenceService],
  exports: [PostsPersistenceService],
})
export class PostsPersistenceModule {}
