import type { ILink } from './link.interface.ts';
import type { IProfile } from './profile.interface.ts';

interface IUser {
  id: number,
  email: string,
  links: ILink[],
  profile: IProfile
}

export type { IUser };