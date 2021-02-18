// Temp basic auth user payload
export interface IUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export interface IUser {
  userId: number;
  authProviderId?: number;
  picture?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  token?: string;
}
