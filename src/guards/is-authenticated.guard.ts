import type { RouteLocationNormalized } from 'vue-router';
import type { IAuthenticationStore } from '@/interfaces/authentication-store.interface.ts';

export const isAuthenticatedGuard = (authenticatedStore: IAuthenticationStore, to: RouteLocationNormalized, from: RouteLocationNormalized) => {

  // Check if the user is authenticated
  // if the user is authenticated return true
  // else return false

  authenticatedStore.checkIfAuthenticated();
  if (authenticatedStore.isLogged.value) return true;
  return false;

}