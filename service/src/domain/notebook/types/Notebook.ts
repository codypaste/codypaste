import bcrypt from 'bcryptjs';

export interface Notebook {
  notebookId: number;
  author?: number | null;
  title: string;
  password?: string;
  expirationDatetime?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface NotebookDTO {
  title: string;
  password?: string | null;
  expirationDatetime?: string | null;
  author?: number | null;
}

export class NotebookModel implements NotebookDTO {
  author?: number | null;
  title: string;
  password?: string | null;
  expirationDatetime?: string | null;

  constructor(notebookDTO: NotebookDTO, author?: number) {
    this.title = notebookDTO.title;
    this.password = notebookDTO.password;
    this.expirationDatetime = notebookDTO.expirationDatetime;
    this.author = author;
  }

  async create(): Promise<NotebookDTO> {
    const password = this.password ? await bcrypt.hash(this.password, 10) : null;

    return {
      title: this.title,
      password: password,
      expirationDatetime: this.expirationDatetime || null,
      author: this.author || null,
    };
  }
}
