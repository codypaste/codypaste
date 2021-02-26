import { Logger } from 'pino';
import { Inject, Service } from 'typedi';

import { LOGGER, NOTEBOOKS_REPOSITORY } from '../../../di-container/diTokens';
import { NotebookDTO, NotebookModel } from '../types/Notebook';
import { notebookValidationSchema } from '../../validation-schemas/notebook';
import NotebooksRepository from '../repository/notebooksRepository';

@Service()
export default class NotebooksService {
  constructor(
    @Inject(LOGGER)
    private logger: Logger,

    @Inject(NOTEBOOKS_REPOSITORY)
    private notebooksRepository: NotebooksRepository
  ) {}

  async create(payload: NotebookDTO, authorId: number): Promise<number> {
    await notebookValidationSchema.validateAsync(payload);
    return this.notebooksRepository.insert(await new NotebookModel(payload, authorId).create());
  }
}
