import { Note } from '../../notes/schemas/note.schema';
import { Category } from '../../notes/enums/category.enum';

export type CategoryWithNotes = Record<Category, Note[]>;
