import type { RouteLocationNormalized } from 'vue-router';
import type { StoreGeneric } from 'pinia';

export const isGuestGuard = (authenticationStore: StoreGeneric, to: RouteLocationNormalized, from: RouteLocationNormalized) => {

  // Check if the user is authenticated
  // if the user is not authenticated return true
  // else return false

  authenticationStore.checkIfAuthenticated();
  return !authenticationStore.isLogged;

}