import type { RouteLocationNormalized } from 'vue-router';
import type { IAuthenticationStore } from '@/interfaces/authentication-store.interface.ts';

export const isGuestGuard = (authenticationStore: IAuthenticationStore, to: RouteLocationNormalized, from: RouteLocationNormalized) => {

  // Check if the user is authenticated
  // if the user is not authenticated return true
  // else return false

  authenticationStore.checkIfAuthenticated();
  if (!authenticationStore.isLogged.value) return true;
  return false;

}