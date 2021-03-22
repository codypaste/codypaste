import Knex from 'knex';
import { TABLES } from '../../../database/postgres';
import { Notebook, NotebookMapper, NotebookModel } from '../entities/Notebook';
import { ResourceRepository } from './repository.types';

export default class NotebooksRepository implements ResourceRepository {
  constructor(private pgPool: Knex) {}

  async insert(notebook: Notebook): Promise<string> {
    const [notebookPublicId] = await this.pgPool.insert(notebook, 'publicId').into(TABLES.NOTEBOOKS);

    return notebookPublicId;
  }

  async getSingle(notebookPublicId: string): Promise<Notebook | null> {
    return NotebookMapper.fromPersistence(
      await this.pgPool(TABLES.NOTEBOOKS).where('publicId', notebookPublicId).first()
    );
  }

  async getAllForAuthor(authorId: number): Promise<Array<Notebook | null>> {
    const foundModels = (await this.pgPool(TABLES.NOTEBOOKS).where('author', authorId)) as Array<NotebookModel>;

    if (!foundModels.length) {
      return [];
    }

    return foundModels.map((model) => NotebookMapper.fromPersistence(model));
  }
}
