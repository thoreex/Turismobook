import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setObjectValue = (key: string, objectValue: any) => {
    if (window.localStorage) {
      localStorage.setItem(key, JSON.stringify(objectValue));
    } else {
      throw new Error('No se puede almacenar la información, porque no está habilitado el localStorage');
    }
  }
  getObjectValue = (key: string) => {
    if (window.localStorage) {
      const DATA = JSON.parse(localStorage.getItem(key));
      return DATA ? DATA : [];
    } else {
      throw new Error('No se puede obtener la información, porque no está habilitado el localStorage');
    }
  }

  deleteObjectValue = (key: string) => {
    if (window.localStorage) {
      localStorage.removeItem(key);
    } else {
      throw new Error('No se puede almacenar la información, porque no está habilitado el localStorage');
    }
  }

  existObjectValue = (key: string): boolean => {
    if (window.localStorage) {
      const DATA = JSON.parse(localStorage.getItem(key));
      return DATA ? true : false;
    } else {
      throw new Error('No se puede almacenar la información, porque no está habilitado el localStorage');
    }
  }
}
