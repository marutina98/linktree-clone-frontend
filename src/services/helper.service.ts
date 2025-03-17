class HelperService {
  
  public isEmailValid(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  public isPasswordValid(password: string) {
    const regex = /^.{8,}$/;
    return regex.test(password);
  }

}

export const helperService = new HelperService();