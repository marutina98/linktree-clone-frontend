import { isEmail, isLength } from 'validator';

class HelperService {
  
  public isEmailValid(email: string) {
    return isEmail(email);
  }

  public isPasswordValid(password: string) {
    return isLength(password, { min: 8 });
  }

  public isOnlyLettersAndSpaces(str: string) {
    const regex = /^[a-zA-Z]+(?:[a-zA-Z\s]*[a-zA-Z]+)*$/;
    return regex.test(str);
  }

  public isValidBiography(str: string) {

  }

}

export const helperService = new HelperService();