import { Module } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { PrismaService } from 'src/prisma.service';
import { TagsService } from 'src/tags/tags.service';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService, PrismaService, TagsService, AppGateway],
})
export class NotesModule {}
