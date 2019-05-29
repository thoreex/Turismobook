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
