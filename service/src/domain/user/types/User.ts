// Temp basic auth user payload
export interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export interface User {
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
