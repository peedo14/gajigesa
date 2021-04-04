import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Notes, Prisma } from '@prisma/client';
import { IPrismaPagination } from './notes.interface';
import { AppGateway } from 'src/app.gateway';
import { TagsService } from 'src/tags/tags.service';

const now = () => new Date().toISOString();
@Injectable()
export class NotesService {
  constructor(
    private prisma: PrismaService,
    private readonly tagsService: TagsService,
    private gateway: AppGateway,
  ) {}

  checkTagExist = async (arrInput: string[]): Promise<string> => {
    const listTags = await this.tagsService.findAll();
    const tagsName = listTags.map((tags) => tags.name);
    for (const name of arrInput) {
      if (!tagsName.includes(name)) {
        return name;
      } else continue;
    }
    return null;
  };

  async findAll(data: IPrismaPagination): Promise<Notes[]> {
    return this.prisma.notes.findMany({
      ...data,
    });
  }

  async findOne(id: number): Promise<Notes> {
    return this.prisma.notes.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: Prisma.NotesUpdateInput): Promise<Notes> {
    delete data.created_at;
    data.updated_at = now();
    return this.prisma.notes.update({
      data,
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.NotesCreateInput): Promise<Notes> {
    data.created_at = now();
    const result = await this.prisma.notes.create({
      data,
    });
    this.gateway.wss.emit('newNotes', result);
    return result;
  }
}
