import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Notes } from '@prisma/client';
import { GeneralResponse } from 'src/types';
import { CreateNotesDto, PaginationNotesDTO, UpdateNotesDto } from './dto';

import { NotesService } from './notes.service';
import { HTTP_STATUS } from '../constants/http';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { FormatErrorResponse } from 'src/common/format';

@Controller('api/v1/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('all')
  @ApiQuery({ name: 'page', description: 'default 0', required: false })
  @ApiQuery({ name: 'limit', description: 'default 10', required: false })
  @ApiOkResponse({ description: 'List of users' })
  @ApiInternalServerErrorResponse({ description: 'error default' })
  async getAllNotes(
    @Query() query?: PaginationNotesDTO,
  ): Promise<
    GeneralResponse<{ page: number; limit: number; data: Notes[] }, string>
  > {
    try {
      const { page = 0, limit = 10 } = query;
      const listNotes = await this.notesService.findAll({
        skip: page * limit,
        take: limit,
      });
      return {
        statusCode: HTTP_STATUS.OK,
        message: 'list of notes',
        data: {
          page,
          limit,
          data: listNotes,
        },
      };
    } catch (e) {
      return FormatErrorResponse(e);
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: 'get detail user' })
  @ApiInternalServerErrorResponse({ description: 'error default' })
  async getDetailNotesById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GeneralResponse<Notes, string>> {
    try {
      const result = await this.notesService.findOne(id);
      return {
        statusCode: HTTP_STATUS.OK,
        message: 'detail notes',
        data: result,
      };
    } catch (e) {
      return FormatErrorResponse(e);
    }
  }

  @Put(':id')
  @ApiOkResponse({ description: 'user updated' })
  @ApiBadRequestResponse({ description: 'error validation' })
  @ApiNotFoundResponse({ description: 'error tags not found' })
  @ApiInternalServerErrorResponse({ description: 'error default' })
  @ApiBody({ type: UpdateNotesDto })
  async updateNotesById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNote: UpdateNotesDto,
  ): Promise<GeneralResponse<Notes, string>> {
    try {
      const findMissingTags = await this.notesService.checkTagExist(
        updateNote.tags,
      );
      if (findMissingTags) {
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: `Tags ${findMissingTags} doesn't exist`,
          error: null,
        };
      }
      const result = await this.notesService.update(id, updateNote);
      return {
        statusCode: HTTP_STATUS.OK,
        message: 'detail notes',
        data: result,
      };
    } catch (e) {
      return FormatErrorResponse(e);
    }
  }

  @Post('add')
  @ApiOkResponse({ description: 'user created' })
  @ApiBadRequestResponse({ description: 'error validation' })
  @ApiNotFoundResponse({ description: 'error tags not found' })
  @ApiInternalServerErrorResponse({ description: 'error default' })
  @ApiBody({ type: CreateNotesDto })
  async createNote(
    @Body(new ValidationPipe()) CreateNotesDTO: CreateNotesDto,
  ): Promise<GeneralResponse<Notes, string>> {
    try {
      const findMissingTags = await this.notesService.checkTagExist(
        CreateNotesDTO.tags,
      );
      if (findMissingTags) {
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: `Tags ${findMissingTags} doesn't exist`,
          error: null,
        };
      }
      const newNotes = await this.notesService.create(CreateNotesDTO);
      return {
        statusCode: HTTP_STATUS.OK,
        message: 'Note Created',
        data: newNotes,
      };
    } catch (e) {
      return FormatErrorResponse(e);
    }
  }
}
