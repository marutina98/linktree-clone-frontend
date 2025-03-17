import type { Ref } from "vue"

interface IAuthenticationStore {
  isLogged: Ref<boolean>|boolean,
  cookie: object,
  setToken: Function,
  deleteToken: Function,
  checkIfAuthenticated: Function,
}

export type { IAuthenticationStore }