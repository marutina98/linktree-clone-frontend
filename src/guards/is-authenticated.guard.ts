import type { Ref } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';
import type { StoreGeneric } from 'pinia';

export const isAuthenticatedGuard = (authenticationStore: StoreGeneric, to: RouteLocationNormalized, from: RouteLocationNormalized) => {

  // Check if the user is authenticated
  // if the user is authenticated return true
  // else return false

  authenticationStore.checkIfAuthenticated();
  return authenticationStore.isLogged;

}