import Knex from 'knex';
import { TABLES } from '../../../database/postgres';
import { NotebookDTO } from '../types/Notebook';

export default class NotebooksRepository {
  constructor(private pgPool: Knex) {}

  async insert(notebook: NotebookDTO): Promise<number> {
    const [notebookId] = await this.pgPool
      .insert(
        {
          title: notebook.title,
          password: notebook.password,
          expirationDatetime: notebook.expirationDatetime,
          author: notebook.author,
        },
        'notebookId'
      )
      .into(TABLES.NOTEBOOKS);

    return notebookId;
  }
}
