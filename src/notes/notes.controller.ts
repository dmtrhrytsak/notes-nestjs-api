import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ParseMongodbId } from '../pipes/parse-mongodb-id.pipe';
import { IStatistic } from '../stats/interfaces/stats.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';
import { Note } from './schemas/note.schema';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  getAll(): Promise<Note[]> {
    return this.notesService.getAll();
  }

  @Get('stats')
  getStats(): Promise<IStatistic[]> {
    return this.notesService.getStats();
  }

  @Get(':id')
  getOne(@Param('id', ParseMongodbId) id: string): Promise<Note> {
    return this.notesService.getOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id', ParseMongodbId) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): void {
    this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseMongodbId) id: string): void {
    this.notesService.remove(id);
  }

  @Get(':id/archive')
  @HttpCode(HttpStatus.NO_CONTENT)
  archive(@Param('id', ParseMongodbId) id: string): void {
    this.notesService.archive(id);
  }
}
