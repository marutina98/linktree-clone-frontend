import type { IAuthenticationLoginData } from '@/interfaces/authentication-login-data.interface.ts';
import type { IAuthenticationSignupData } from '@/interfaces/authentication-signup-data.interface.ts';
import { useAuthenticationStore } from '@/stores/use-authentication-store.store.ts';

class ApiService {

  private baseURL: string = 'http://localhost:8000/api/';

  async login(data: IAuthenticationLoginData) {

    const api = this.baseURL + 'authentication/login';

    return await fetch(api, {
      mode: 'cors',
      method: 'POST',
      headers: this.getHeaders('POST'),
      body: JSON.stringify(data),
    });

  }

  async signup(data: IAuthenticationSignupData) {

    const api = this.baseURL + 'authentication/register';

    return await fetch(api, {
      mode: 'cors',
      method: 'POST',
      headers: this.getHeaders('POST'),
      body: JSON.stringify(data),
    });

  }

  async getAuthenticatedUser() {

    const api = this.baseURL + 'users/authenticated';

    return await fetch(api, {
      mode: 'cors',
      method: 'GET',
      headers: this.getHeaders('GET')
    });

  }

  getHeaders (method: string) {

    const headers = [
      ['Access-Control-Allow-Headers', '*'],
    ];

    const authenticationStore = useAuthenticationStore();

    // Check if user is authenticated

    authenticationStore.checkIfAuthenticated();
    const isLogged = authenticationStore.isLogged;

    if (method === 'POST') {
      headers.push(['Content-Type', 'application/json']);
    }

    if (isLogged) {
      const token = authenticationStore.getToken();
      headers.push(['Authorization', `Bearer ${token}`]);
    }

    return Object.fromEntries(headers);

  }

}

export const apiService = new ApiService();