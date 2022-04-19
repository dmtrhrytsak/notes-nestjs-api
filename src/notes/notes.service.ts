import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StatsService } from '../stats/stats.service';
import { IStatistic } from '../stats/interfaces/stats.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
    private readonly statsService: StatsService,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<NoteDocument> {
    return this.noteModel.create(createNoteDto);
  }

  async getAll(): Promise<NoteDocument[]> {
    return this.noteModel.find();
  }

  async getOne(id: string): Promise<NoteDocument> {
    const note = await this.noteModel.findById(id);

    if (!note) {
      throw new NotFoundException(`Note with id ${id} wasn't found`);
    }

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<void> {
    const note = await this.getOne(id);

    note.$set(updateNoteDto);
  }

  async remove(id: string): Promise<void> {
    const note = await this.getOne(id);

    await note.remove();
  }

  async archive(id: string): Promise<void> {
    const note = await this.getOne(id);

    note.archived = !note.archived;

    await note.save();
  }

  async getStats(): Promise<IStatistic[]> {
    const notes = await this.getAll();

    return this.statsService.getStats(notes);
  }
}
