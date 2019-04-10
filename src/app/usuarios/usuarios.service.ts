import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { USUARIOS } from './mock-usuarios';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }

  getUsuarios = (): Observable<Usuario[]> => {
    return of(USUARIOS);
  }

  getUsuario = (id: number): Observable<Usuario> => {
    return of(USUARIOS.find(usuario => usuario.id === id));
  }
}
