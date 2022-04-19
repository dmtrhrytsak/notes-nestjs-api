import { Category } from '../../notes/enums/category.enum';
import { NoteState } from '../../notes/types/note-state.type';

export interface IStatistic {
  category: Category;
  stats: Record<NoteState, number>;
}
