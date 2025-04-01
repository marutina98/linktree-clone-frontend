import type { IUser } from './user.interface.ts';

interface IAuthenticationRequest extends IUser {
  user: IUser,
  token: string,
}

export type { IAuthenticationRequest };