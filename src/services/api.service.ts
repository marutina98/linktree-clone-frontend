import type { IAuthenticationLoginData } from '@/interfaces/authentication-login-data.interface.ts';

class ApiService {

  private baseURL: string = 'http://localhost:8000/api/';

  async login(data: IAuthenticationLoginData) {

    const api = this.baseURL + 'authentication/login';

    return await fetch(api, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

  }

}

export const apiService = new ApiService();