import type { Ref } from "vue"
import type { IUser } from "./user.interface.ts"

interface IAuthenticationStore {
  isLogged: Ref<boolean>|boolean,
  cookie: object,
  setToken: Function,
  deleteToken: Function,
  checkIfAuthenticated: Function,
  user: Ref<IUser|null>,
  $subscribe: Function,
  setUser: Function,
  getUser: Function,
}

export type { IAuthenticationStore }