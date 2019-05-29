import { Injectable } from '@angular/core';
import { Resena } from './resena';
import { Observable, of } from 'rxjs';
import { RESENAS } from './mock-resenas';

@Injectable({
  providedIn: 'root'
})
export class ResenasService {

  constructor() { }

  getResenas = (): Observable<Resena[]> => {
    return of(RESENAS);
  }

  getResena = (id: number): Observable<Resena> => {
    return of(RESENAS.find(noticia => noticia.id === id));
  }
}
