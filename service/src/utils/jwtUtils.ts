import config from 'config';
import jwt from 'jsonwebtoken';
import { IUser } from '../domain/entities/IUser';

const { jwtSecret } = config.get('service');

export interface IUserTokenData {
  userId: number;
}

export const signJwt = (payload: IUser, options = {}): string =>
  jwt.sign(
    {
      iat: Date.now(),
      ...payload,
    },
    jwtSecret,
    options
  );

export const verify = (token: string, options = {}): IUserTokenData =>
  jwt.verify(token, jwtSecret, options) as IUserTokenData;
