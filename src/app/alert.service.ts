import { Injectable } from '@angular/core';
import * as alertifyJs from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() {}

  showAlert = (msg: string, error: boolean) => {
    let titulo: string;
    if (error) {
      titulo = '¡Error!';
      alertifyJs.defaults.theme.ok = 'btn btn-danger';
    } else {
      titulo = '¡Éxito!';
      alertifyJs.defaults.theme.ok = 'btn btn-primary';
    }
    alertifyJs.alert().setting({
      title: titulo,
      message: msg,
      pinnable: false,
      modal: false,
      closable: false,
      resizable: false,
      maximizable: false,
      frameless: false,
      transition: 'zoom'
    }).show();
  }

  runSuccess = (msg: string) => {
    alertifyJs.success(msg);
  }

  runError = (msg: string) => {
    alertifyJs.error(msg);
  }
}
