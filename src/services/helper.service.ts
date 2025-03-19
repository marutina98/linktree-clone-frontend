class HelperService {
  
  public isEmailValid(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  public isPasswordValid(password: string) {
    const regex = /^.{8,}$/;
    return regex.test(password);
  }

  public isOnlyLettersAndSpaces(str: string) {
    const regex = /^[a-zA-Z]+(?:[a-zA-Z\s]*[a-zA-Z]+)*$/;
    return regex.test(str);
  }

  public convertBase64ToImage(base64: string) {
    const image = new Image();
    image.src = base64;
    return image;
  }

}

export const helperService = new HelperService();