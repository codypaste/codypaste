import { Notebook, NotebookMapper } from './Notebook';

describe('Notebook entities tests', () => {
  describe('mapping service input to notebook entity tests', () => {
    describe('for non authoried user', () => {
      it('should create new public notebook entity using input payload without author specified', async () => {
        // given
        const inputPayload = {
          title: 'Example title 1',
          password: 'Some secret password',
        };

        const authorId = null;

        // when
        const notebook = await NotebookMapper.fromInputPayload(inputPayload, authorId);

        // then
        expect(notebook.title).toBe(inputPayload.title);

        expect(notebook.password).not.toBeNull();
        expect(notebook.password).not.toBe(inputPayload.password);

        expect(notebook.author).toBeNull();
        expect(notebook.isPublic).toBe(true);
        expect(notebook.expirationDatetime).toBeNull();
      });
    });

    describe('for authorized user', () => {
      it('should create new private notebook entity using input payload with author specified without isPublic set', async () => {
        // given
        const inputPayload = {
          title: 'Example title 2',
          password: 'Some secret password',
        };

        const authorId = 5;

        // when
        const notebook = await NotebookMapper.fromInputPayload(inputPayload, authorId);

        // then
        expect(notebook.title).toBe(inputPayload.title);

        expect(notebook.password).not.toBeNull();
        expect(notebook.password).not.toBe(inputPayload.password);

        expect(notebook.author).toEqual(authorId);
        expect(notebook.isPublic).toBe(false);
        expect(notebook.expirationDatetime).toBeNull();
      });

      it('should create new private notebook entity using input payload with author specified with isPublic set to true', async () => {
        // given
        const inputPayload = {
          title: 'Example title 2',
          password: 'Some secret password',
          isPublic: true,
        };

        const authorId = 5;

        // when
        const notebook = await NotebookMapper.fromInputPayload(inputPayload, authorId);

        // then
        expect(notebook.title).toBe(inputPayload.title);

        expect(notebook.password).not.toBeNull();
        expect(notebook.password).not.toBe(inputPayload.password);

        expect(notebook.author).toEqual(authorId);
        expect(notebook.isPublic).toBe(true);
        expect(notebook.expirationDatetime).toBeNull();
      });
    });

    describe('setting publicId', () => {
      it('should set unique publicId for each new notebook', async () => {
        // given
        const inputPayload1 = {
          title: 'Example title 1',
          password: 'Some secret password',
        };

        const inputPayload2 = {
          title: 'Example title 2',
          password: 'Some s3cret password',
        };

        const authorId = 123;

        // when
        const notebook1 = await NotebookMapper.fromInputPayload(inputPayload1, authorId);
        const notebook2 = await NotebookMapper.fromInputPayload(inputPayload2, authorId);

        // then
        expect(notebook1.publicId).not.toBeNull();
        expect(notebook2.publicId).not.toBeNull();

        expect(notebook1.publicId).not.toEqual(notebook2.publicId);
      });
    });
  });

  describe('mapping db response to notebook entity tests', () => {
    it('should map notebook db representation to notebook entity with password removed', () => {
      // given
      const dbResponseModel = {
        title: 'Example title 1',
        password: '$2a$10$DWv8so.vmCEmBaeJ5mhsxeJGa6WyiSG2lxclmZctNDmrH5YFxx16e',
        isPublic: false,
        author: 22,
        notebookId: 1,
        publicId: 'nHg4CU7ra',
        expirationDatetime: null,
        createdAt: '2021-03-02 20:42:30',
        updatedAt: '2021-03-02 20:42:30',
      };

      // when
      const notebook = NotebookMapper.fromPersistence(dbResponseModel);

      // then
      expect(notebook?.title).toBe(dbResponseModel.title);
      expect(notebook?.password).toBeNull();
      expect(notebook?.isPublic).toBe(dbResponseModel.isPublic);
      expect(notebook?.author).toBe(dbResponseModel.author);
      expect(notebook?.notebookId).toBe(dbResponseModel.notebookId);
      expect(notebook?.expirationDatetime).toBe(dbResponseModel.expirationDatetime);
      expect(notebook?.createdAt).toBe(dbResponseModel.createdAt);
      expect(notebook?.updatedAt).toBe(dbResponseModel.updatedAt);
    });
  });

  describe('isAuthorizedForUser tests', () => {
    it('should return true for both auth/unauthorized users when notebook was created for unauthorized user', () => {
      // given
      const unauthorizedUser = null;
      const notebook = new Notebook('Example title', 'abc123', unauthorizedUser);

      const authorizedUserId = 12;
      const anotherUnauthorizedUser = null;

      // when
      const resForAuthUser = notebook.isAuthorizedForUser(authorizedUserId);
      const resForUnauthUser = notebook.isAuthorizedForUser(anotherUnauthorizedUser);

      // then
      expect(resForAuthUser).toBeTruthy();
      expect(resForUnauthUser).toBeTruthy();
    });

    it('should return true only for owner when notebook was created for authorized user', () => {
      // given
      const notebookOwnerId = 12;
      const notebook = new Notebook('Example title', 'abc123', notebookOwnerId);

      const anotherAuthorizedUserId = 33;
      const unauthorizedUserId = null;

      // when
      const resForOwner = notebook.isAuthorizedForUser(notebookOwnerId);
      const resForAuthUser = notebook.isAuthorizedForUser(anotherAuthorizedUserId);
      const resForUnauthUser = notebook.isAuthorizedForUser(unauthorizedUserId);

      // then
      expect(resForOwner).toBeTruthy();
      expect(resForAuthUser).toBeFalsy();
      expect(resForUnauthUser).toBeFalsy();
    });

    it('should return true if accessing user is not owner but notebook has isPublic set to true', () => {
      // given
      const notebookOwnerId = 12;
      const isPublic = true;
      const notebook = new Notebook('Example title', 'abc123', notebookOwnerId, isPublic);

      const anotherAuthorizedUserId = 33;
      const unauthorizedUserId = null;

      // when
      const resForOwner = notebook.isAuthorizedForUser(notebookOwnerId);
      const resForAuthUser = notebook.isAuthorizedForUser(anotherAuthorizedUserId);
      const resForUnauthUser = notebook.isAuthorizedForUser(unauthorizedUserId);

      // then
      expect(resForOwner).toBeTruthy();
      expect(resForAuthUser).toBeTruthy();
      expect(resForUnauthUser).toBeTruthy();
    });
  });
});
