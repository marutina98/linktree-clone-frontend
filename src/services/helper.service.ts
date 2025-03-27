import type { IEmoji } from '@/interfaces/emoji.interface.ts';
import { isURL, isEmail, isLength, escape } from 'validator';

class HelperService {
  
  public isURLValid(url: string) {
    return isURL(url);
  }

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

  // @todo: sanitizeBiography and Text should be replaced

  public isValidBiography(str: string) {
    return isLength(str, { min: 0, max: 255 });
  }

  public isValidText(str: string) {
    return isLength(str, { min: 3, max: 255 });
  }

  public sanitizeBiography(str: string) {
    return escape(str);
  }

  public sanitizeText(str: string) {
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

  // Generate Emoji from Database

  public generateEmojiObject(unicode: string): IEmoji {
  
    const emoji = String.fromCodePoint(parseInt(unicode, 16));
  
    return {
      i: emoji,
      r: unicode,
      t: 'neutral',
      u: unicode,
    };

  }

  public getIconChar(icon: string) {
    return String.fromCodePoint(parseInt(icon, 16));
  }

}

export const helperService = new HelperService();