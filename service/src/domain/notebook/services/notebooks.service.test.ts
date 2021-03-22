import { Notebook, NotebookInputDTO } from '../entities/Notebook';
import { ResourceRepository } from '../repository/repository.types';
import NotebooksService from '../services/notebooks.service';

class MockRepository implements ResourceRepository {
  constructor(private storage: Array<Notebook> = []) {}

  async insert(notebook: Notebook): Promise<string> {
    this.storage.push(notebook);
    const notebookId = Math.floor(Math.random() * Math.floor(10 * 1000));

    return `some${notebookId}id`;
  }

  async getSingle(notebookPublicId: string): Promise<Notebook | null> {
    const [notebook] = this.storage.filter((n) => n.publicId === notebookPublicId);

    return notebook ? notebook : null;
  }

  async getAllForAuthor(authorId: number): Promise<Array<Notebook | null>> {
    return this.storage.filter((n) => n.author === authorId);
  }
}

describe('Notebooks service tests', () => {
  let mockedRepository: ResourceRepository;
  let notebooksService: NotebooksService;
  beforeAll(() => {
    mockedRepository = new MockRepository();
    notebooksService = new NotebooksService(mockedRepository);
  });

  describe('create tests', () => {
    describe('notebook validation tests', () => {
      it('should return 422 validation error when notebook is missing mandatory parameter', async () => {
        // given
        const mandatoryParameters = ['title'];
        const authorId = 1;

        // when
        const payload: any = {
          title: 'Some example title',
          password: 'S0m3 S3cr3T',
          expirationDatetime: '2021-03-22T19:35:41.377Z',
        };

        // then
        for (const mandatoryParam of mandatoryParameters) {
          const testPayload = Object.assign({}, payload);
          delete testPayload[mandatoryParam];

          try {
            await notebooksService.create(testPayload as NotebookInputDTO, authorId);
          } catch (e) {
            expect(e).toMatchObject({ message: `"${mandatoryParam}" is required` });
          }
        }
      });
    });

    it('should create new notebook returning its id', async () => {
      // given
      const authorId = 1;

      const payload = {
        title: 'Some example title',
        password: 'S0m3 S3cr3T',
        expirationDatetime: '2021-03-22T19:35:41.377Z',
      };

      // when
      const publicId = await notebooksService.create(payload, authorId);

      // then
      expect(publicId).toMatch(/some\d+id/);
    });
  });
});
