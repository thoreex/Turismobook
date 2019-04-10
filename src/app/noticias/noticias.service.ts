import { Injectable } from '@angular/core';
import { Noticia } from './noticia';
import { Observable, of } from 'rxjs';
import { NOTICIAS } from './mock-noticias';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor() { }

  getNoticias = (): Observable<Noticia[]> => {
    return of(NOTICIAS);
  }

  getNoticia = (id: number): Observable<Noticia> => {
    return of(NOTICIAS.find(noticia => noticia.id === id));
  }

}
