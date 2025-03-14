import type { Ref } from "vue"

interface IAuthenticatedStore {
  isLogged: Ref,
  cookie: object,
  setToken: Function,
  deleteToken: Function,
  checkIfAuthenticated: Function,
}

export type { IAuthenticatedStore }