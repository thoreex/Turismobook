import { Injectable } from '@angular/core';
import { Comentario } from './comentario';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private collection: AngularFirestoreCollection<Comentario>;

  constructor(private readonly db: AngularFirestore) {
    this.collection = this.db.collection<Comentario>('comentarios');
  }

  getComentarios = (): BehaviorSubject<Comentario[]> => {
    const comentarios = new BehaviorSubject(null);
    this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Comentario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(comentarios);
    return comentarios;
  }

  getComentario = (id: string): BehaviorSubject<Comentario> => {
    const comentario = new BehaviorSubject(null);
    this.collection.doc<Comentario>(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Comentario;
        return { id, ...data };
      })
    ).subscribe(comentario);
    return comentario;
  }

  updateComentario = (id: string, comentario: Comentario) => {
    this.collection.doc(id).update(comentario);
  }

  addComentario = (comentario: Comentario): string => {
    const id = this.db.createId();
    this.collection.doc(id).set(comentario);
    return id;
  }

  deleteComentario = (comentario: Comentario) => {
    this.collection.doc<Comentario>(comentario.id).delete();
  }
}
