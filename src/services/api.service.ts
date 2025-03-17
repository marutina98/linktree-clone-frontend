import type { IAuthenticationLoginData } from '@/interfaces/authentication-login-data.interface.ts';
import type { IAuthenticationSignupData } from '@/interfaces/authentication-signup-data.interface.ts';

class ApiService {

  private baseURL: string = 'http://localhost:8000/api/';

  // @todo: add method that gets correct headers

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

  async signup(data: IAuthenticationSignupData) {

    const api = this.baseURL + 'authentication/register';

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