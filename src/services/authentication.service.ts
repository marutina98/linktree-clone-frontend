
import { useCookies } from '@vueuse/integrations/useCookies';

class AuthenticationService {

  private cookie = useCookies(['token']);
  private _authenticatedStore;

  set authenticatedStore(store) {
    this.authenticatedStore = store;
  }

  setToken(token: string) {
    this.cookie.set('token', token);
    this._authenticatedStore.checkAuthenticatedStatus();
  }

  removeToken() {
    this.cookie.remove('token');
    this._authenticatedStore.checkAuthenticatedStatus();
  }

}

export const authenticationService = new AuthenticationService();