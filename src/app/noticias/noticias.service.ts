import { Injectable } from '@angular/core';
import { Noticia } from './noticia';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private noticias: AngularFirestoreCollection<Noticia>;

  constructor( private readonly db: AngularFirestore) {
    this.noticias = this.db.collection<Noticia>('noticias');
  }

  getNoticias = (): BehaviorSubject<Noticia[]> => {
    const noticias = new BehaviorSubject(null);
    this.noticias.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Noticia;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(noticias);
    return noticias;
  }

  getNoticia = (id: string): BehaviorSubject<Noticia> => {
    const noticia = new BehaviorSubject(null);
    this.noticias.doc<Noticia>(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Noticia;
        return { id, ...data };
      })
    ).subscribe(noticia);
    return noticia;
  }

  updateNoticia = (id: string, noticia: Noticia) => {
    this.noticias.doc<Noticia>(id).update(noticia);
  }

  addNoticia = (noticia: Noticia): string => {
    const id = this.db.createId();
    this.noticias.doc(id).set(noticia);
    return id;
  }

  deleteNoticia = (noticia: Noticia) => {
    this.noticias.doc<Noticia>(noticia.id).delete();
  }
}
