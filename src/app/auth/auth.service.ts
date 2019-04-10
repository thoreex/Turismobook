import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { USUARIOS } from '../usuarios/mock-usuarios';
import { Usuario } from '../usuarios/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  oUsuario: Usuario;

  constructor(private localStorageService: LocalStorageService) {
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(usuario: string, contrasena: string): Observable<boolean> {
    return this.checkCredenciales(usuario, contrasena).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = val)
    );
  }
  checkCredenciales(usuario: string, contrasena: string): Observable<boolean> {
    this.oUsuario = USUARIOS.find(oUsuario => oUsuario.usuario === usuario && oUsuario.contrasena === contrasena);
    return of(this.oUsuario ? true : false);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
