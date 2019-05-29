import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Centro } from './centro';
import { CENTROS } from './mock-centros';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  unDeleteted: Centro[];
  constructor(private authService: AuthService) {
  }

  setCentros = (centros: Centro[]) => {
    //
  }

  getCentros = (): Observable<Centro[]> => {
    return of(CENTROS);
  }

  getFilteredCentros = (): Observable<Centro[]> => {
    const loggedUser = this.authService.oUsuario;
    this.unDeleteted = [];
    CENTROS.forEach((item) => {
      if (!item.fechaEliminacion && item.editor && loggedUser) {
        if (item.editor.id === loggedUser.id) {
          this.unDeleteted.push(item);
        }
      }
    });
    return of(this.unDeleteted);
  }

  getCentrosA = (): Centro[] => {
    return CENTROS;
  }

  setCentro = (centro: Centro) => {
    //
  }

  getCentro = (id: number): Observable<Centro> => {
    return of(CENTROS.find(centro => centro.id === id));
  }

}
