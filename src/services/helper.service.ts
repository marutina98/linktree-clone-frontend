import { isEmail, isLength, escape } from 'validator';

class HelperService {
  
  public isEmailValid(email: string) {
    return isEmail(email);
  }

  public isPasswordValid(password: string) {
    return isLength(password, { min: 8, max: 255 });
  }

  public isOnlyLettersAndSpaces(str: string) {
    const regex = /^[a-zA-Z]+(?:[a-zA-Z\s]*[a-zA-Z]+)*$/;
    return regex.test(str);
  }

  public isValidBiography(str: string) {
    return isLength(str, { min: 0, max: 255 });
  }

  public sanitizeBiography(str: string) {
    return escape(str);
  }

  // Convert uploaded Image File into a Base64 String

  public convertImageToBase64(image: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

}

export const helperService = new HelperService();