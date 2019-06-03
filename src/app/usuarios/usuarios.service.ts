import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  USUARIOS = [];

  constructor() { }

  getUsuarios = (): Observable<Usuario[]> => {
    return of(this.USUARIOS);
  }

  getUsuario = (id: number): Observable<Usuario> => {
    return of(this.USUARIOS.find(usuario => usuario.id === id));
  }
}
