import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private collection: AngularFirestoreCollection<Usuario>;

  constructor(private readonly db: AngularFirestore) {
    this.collection = this.db.collection<Usuario>('usuarios');
  }

  getUsuarios = (): Observable<Usuario[]> => {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getUsuario = (id: string): Observable<Usuario> => {
    return this.collection.doc<Usuario>(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Usuario;
        return { id, ...data };
      })
    );
  }
}
