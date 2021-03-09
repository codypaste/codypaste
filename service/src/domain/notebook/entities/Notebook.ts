import bcrypt from 'bcryptjs';
import shortid from 'shortid';

// interface for notebook postgres table schema
export interface NotebookModel {
  publicId: string;
  title: string;
  isPublic: boolean;

  notebookId?: number;
  author?: number | null;
  password?: string | null;
  expirationDatetime?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface NotebookInputDTO {
  title: string;

  password?: string | null;
  expirationDatetime?: string | null;
  isPublic?: boolean;
}

export class Notebook {
  constructor(
    readonly title: string,
    readonly publicId: string,

    readonly author?: number | null,
    readonly isPublic?: boolean,
    readonly password?: string | null,
    readonly expirationDatetime?: string | null,
    readonly notebookId?: number,
    readonly createdAt?: string,
    readonly updatedAt?: string
  ) {
    this.isPublic = this.setIsPublicValue(isPublic);
  }

  setIsPublicValue(isPublic?: boolean): boolean {
    if (isPublic !== undefined) {
      return isPublic;
    }
    if (this.author === null) {
      return true;
    }

    return false;
  }

  isAuthorizedForUser(userId: number | null): boolean {
    if (this.isPublic === true) {
      return true;
    } else {
      return this.author === userId;
    }
  }
}

export class NotebookMapper {
  public static async fromInputPayload(notebookDTO: NotebookInputDTO, author?: number | null): Promise<Notebook> {
    const password = notebookDTO.password ? await bcrypt.hash(notebookDTO.password, 10) : null;
    const publicId = shortid.generate();

    return new Notebook(
      notebookDTO.title,
      publicId,
      author || null,
      notebookDTO.isPublic,
      password,
      notebookDTO.expirationDatetime || null
    );
  }

  public static fromPersistence(notebookModel: NotebookModel | null): Notebook | null {
    if (!notebookModel) {
      return null;
    }

    return new Notebook(
      notebookModel.title,
      notebookModel.publicId,
      notebookModel.author,
      notebookModel.isPublic,
      null, // removing hashed password
      notebookModel.expirationDatetime,
      notebookModel.notebookId,
      notebookModel.createdAt,
      notebookModel.updatedAt
    );
  }
}
