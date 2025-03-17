import type { Ref } from "vue"

interface IAuthenticationStore {
  isLogged: Ref,
  cookie: object,
  setToken: Function,
  deleteToken: Function,
  checkIfAuthenticated: Function,
}

export type { IAuthenticationStore }