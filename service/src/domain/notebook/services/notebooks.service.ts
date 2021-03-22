import { Inject, Service } from 'typedi';

import { NOTEBOOKS_REPOSITORY } from '../../../di-container/diTokens';
import { Notebook, NotebookInputDTO, NotebookMapper } from '../entities/Notebook';
import { notebookValidationSchema } from '../../validation-schemas/notebook';
import logger from '../../../utils/logger';
import createHttpError from 'http-errors';

import { ResourceRepository } from '../repository/repository.types';

@Service()
export default class NotebooksService {
  constructor(
    @Inject(NOTEBOOKS_REPOSITORY)
    private notebooksRepository: ResourceRepository
  ) {}

  async create(payload: NotebookInputDTO, authorId: number): Promise<string> {
    await notebookValidationSchema.validateAsync(payload);
    const notebook = await NotebookMapper.fromInputPayload(payload, authorId);
    logger.debug('Saving notebook %o', notebook);

    return await this.notebooksRepository.insert(notebook);
  }

  async getSingleNotebook(notebookPublicId: string, userId: number | null): Promise<Notebook | void> {
    logger.debug('Fetching notebook with id %s', notebookPublicId);

    const notebook = await this.notebooksRepository.getSingle(notebookPublicId);

    if (!notebook) {
      throw createHttpError(404, `Notebook with id ${notebookPublicId} not found!`);
    }

    if (!notebook.isAuthorizedForUser(userId)) {
      throw createHttpError(401, `Unauthorized access to notebook with id ${notebookPublicId}`);
    }

    return notebook;
  }

  async getAllUserNotebooks(userId: number): Promise<Array<Notebook | null>> {
    logger.debug('Fetching all user notebooks');
    if (!userId) {
      throw createHttpError(403, 'Operation not allowed for unauthorized user');
    }

    return this.notebooksRepository.getAllForAuthor(userId);
  }
}
