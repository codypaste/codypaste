import { Logger } from 'pino';
import { Inject, Service } from 'typedi';

import { LOGGER, NOTEBOOKS_REPOSITORY } from '../../../di-container/diTokens';
import { Notebook, NotebookInputDTO, NotebookMapper } from '../entities/Notebook';
import { notebookValidationSchema } from '../../validation-schemas/notebook';
import NotebooksRepository from '../repository/notebooksRepository';
import logger from '../../../utils/logger';
import createHttpError from 'http-errors';

@Service()
export default class NotebooksService {
  constructor(
    @Inject(LOGGER)
    private logger: Logger,

    @Inject(NOTEBOOKS_REPOSITORY)
    private notebooksRepository: NotebooksRepository
  ) {}

  async create(payload: NotebookInputDTO, authorId: number): Promise<number> {
    await notebookValidationSchema.validateAsync(payload);
    // TODO: add unique id re-generation on 'publicId' constraint error
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
