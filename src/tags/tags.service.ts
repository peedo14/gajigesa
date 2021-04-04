import { Injectable } from '@nestjs/common';
import { Tags, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TagsCreateInput): Promise<Tags> {
    return this.prisma.tags.create({
      data,
    });
  }

  async findAll(): Promise<Tags[]> {
    return this.prisma.tags.findMany();
  }
}
