import config from 'config';
import jwt from 'jsonwebtoken';
import { User } from '../domain/user/entities/User';

const { jwtSecret } = config.get('service');
export interface UserTokenData {
  userId: number;
}

export const signJwt = (payload: User, options = {}): string =>
  jwt.sign(
    {
      iat: Date.now(),
      ...payload,
    },
    jwtSecret,
    options
  );

export const verify = (token: string, options = {}): UserTokenData =>
  jwt.verify(token, jwtSecret, options) as UserTokenData;
