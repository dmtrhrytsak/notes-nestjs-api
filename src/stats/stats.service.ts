import { Injectable } from '@nestjs/common';

import { Note } from '../notes/schemas/note.schema';
import { NoteState } from '../notes/types/note-state.type';
import { IStatistic } from './interfaces/stats.interface';
import { CategoryWithNotes } from './types/category-with-notes.type';

@Injectable()
export class StatsService {
  groupNotesByCategory(notes: Note[]): CategoryWithNotes {
    const categoriesWithNotes = notes.reduce<CategoryWithNotes>(
      (categories, note) => {
        if (categories[note.category]) {
          categories[note.category].push(note);
        } else {
          categories[note.category] = [note];
        }

        return categories;
      },
      {} as CategoryWithNotes,
    );

    return categoriesWithNotes;
  }

  getStats(notes: Note[]) {
    const categoriesWithNotes = this.groupNotesByCategory(notes);
    const categories = Object.keys(categoriesWithNotes);

    const statistics: IStatistic[] = [];

    for (const category of categories) {
      const currentNotes: Note[] = categoriesWithNotes[category];

      const stats = currentNotes.reduce<IStatistic['stats']>(
        (states, note) => {
          const noteState: NoteState = note.archived ? 'archived' : 'active';

          states[noteState] += 1;

          return states;
        },
        { active: 0, archived: 0 },
      );

      statistics.push({ category, stats } as IStatistic);
    }

    return statistics;
  }
}
