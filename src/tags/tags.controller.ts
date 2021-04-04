import { Controller, Get, Post, Body } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import {
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger';
import { FormatErrorResponse } from 'src/common/format';
import { Tags } from '@prisma/client';
import { GeneralResponse } from 'src/types';
import { HTTP_STATUS } from 'src/constants/http';

@Controller('api/v1/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOkResponse({ description: 'tag created' })
  @ApiInternalServerErrorResponse({ description: 'error default' })
  @ApiBody({ type: CreateTagDto })
  async create(
    @Body() createTagDto: CreateTagDto,
  ): Promise<GeneralResponse<Tags, string>> {
    try {
      const result = await this.tagsService.create(createTagDto);
      return {
        statusCode: HTTP_STATUS.OK,
        message: 'created tag',
        data: result,
      };
    } catch (e) {
      return FormatErrorResponse(e);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'List of tags' })
  @ApiInternalServerErrorResponse({ description: 'error default' })
  async findAll(): Promise<GeneralResponse<Tags[], string>> {
    try {
      const result = await this.tagsService.findAll();
      return {
        statusCode: HTTP_STATUS.OK,
        message: 'list tag',
        data: result,
      };
    } catch (e) {
      return FormatErrorResponse(e);
    }
  }
}
