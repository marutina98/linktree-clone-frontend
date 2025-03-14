
import { useCookies } from '@vueuse/integrations/useCookies';

class AuthenticationService {

  private cookie = useCookies(['token']);
  private authenticatedStore;

  setAuthenticatedStore(store) {
    this.authenticatedStore = store;
  }

  setToken(token: string) {
    this.cookie.set('token', token);
    this.authenticatedStore.checkAuthenticatedStatus();
  }

  removeToken() {
    this.cookie.remove('token');
    this.authenticatedStore.checkAuthenticatedStatus();
  }

}

export const authenticationService = new AuthenticationService();