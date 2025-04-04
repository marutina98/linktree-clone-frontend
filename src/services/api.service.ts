import type { IAuthenticationLoginData } from '@/interfaces/authentication-login-data.interface.ts';
import type { IAuthenticationSignupData } from '@/interfaces/authentication-signup-data.interface.ts';
import type { ILinkRequest } from '@/interfaces/link-request.interface.ts';
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

  // User

  async getUser(id: string|number) {

    const api = `${this.baseURL}users/${id}`;
    const method = 'GET';

    return await fetch(api, {
      mode: 'cors',
      method: method,
      headers: this.getHeaders(method)
    });

  }

  // Profile

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

  // Link

  async createLink(data: ILinkRequest) {

    const api = this.baseURL + 'links';
    const method = 'POST';

    const body = {
      icon: data.icon,
      name: data.name,
      url: data.url,
    }

    return await fetch(api, {
      mode: 'cors',
      method: method,
      headers: this.getHeaders(method),
      body: JSON.stringify(body),
    });

  }

  async deleteLink(id: number) {

    const api = this.baseURL + `links/${id}`;
    const method = 'DELETE';

    return await fetch(api, {
      mode: 'cors',
      method: method,
      headers: this.getHeaders(method)
    });

  }

  async editLink(data: ILinkRequest) {

    const api = this.baseURL + `links/${data.id}`;
    const method = 'PUT';

    const body = {
      icon: data.icon,
      name: data.name,
      url: data.url,
    }

    return await fetch(api, {
      mode: 'cors',
      method: method,
      headers: this.getHeaders(method),
      body: JSON.stringify(body),
    });

  }

  async moveLinkUp(id: number) {

    const api = this.baseURL + `links/${id}/move-up`;
    const method = 'PUT';

    return await fetch(api, {
      mode: 'cors',
      method: method,
      headers: this.getHeaders(method)
    });

  }

  async moveLinkDown(id: number) {

    const api = this.baseURL + `links/${id}/move-down`;
    const method = 'PUT';

    return await fetch(api, {
      mode: 'cors',
      method: method,
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