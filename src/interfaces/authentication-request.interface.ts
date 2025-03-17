import type { IUser } from './user.interface.ts';

interface IAuthenticationRequest extends IUser {
  token: string,
}

export type { IAuthenticationRequest };