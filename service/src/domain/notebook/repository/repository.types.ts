import { Notebook } from '../entities/Notebook';

export interface ResourceRepository {
  insert(resource: Notebook): Promise<string>;
  getSingle(id: string): Promise<Notebook | null>;
  getAllForAuthor(authorId: number): Promise<Array<Notebook | null>>;
}
