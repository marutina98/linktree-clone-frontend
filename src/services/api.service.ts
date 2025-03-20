import type { IAuthenticationLoginData } from '@/interfaces/authentication-login-data.interface.ts';
import type { IAuthenticationSignupData } from '@/interfaces/authentication-signup-data.interface.ts';
import type { IProfileEditData } from '@/interfaces/profile-edit-data.interface.ts';
import { useAuthenticationStore } from '@/stores/use-authentication-store.store.ts';

class ApiService {

  private baseURL: string = 'http://localhost:8000/api/';

  async login(data: IAuthenticationLoginData) {

    const api = this.baseURL + 'authentication/login';
    const method = 'POST';

    return await fetch(api, {
      mode: 'cors',
      method: method,
      headers: this.getHeaders(method),
      body: JSON.stringify(data),
    });

  }

  async signup(data: IAuthenticationSignupData) {

    const api = this.baseURL + 'authentication/register';
    const method = 'POST';

    return await fetch(api, {
      mode: 'cors',
      method: method,
      headers: this.getHeaders(method),
      body: JSON.stringify(data),
    });

  }

  async getAuthenticatedUser() {

    const api = this.baseURL + 'users/authenticated';
    const method = 'GET';

    return await fetch(api, {
      mode: 'cors',
      method: method,
      headers: this.getHeaders(method)
    });

  }

  async updateProfile(data: IProfileEditData) {

    const api = this.baseURL + 'users';
    const method = 'PUT';

    return await fetch(api, {
      mode: 'cors',
      method: method,
      body: JSON.stringify(data),
      headers: this.getHeaders(method)
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

    if (method === 'POST' || method === 'PUT') {
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