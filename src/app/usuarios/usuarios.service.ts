import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { BehaviorSubject } from 'rxjs';
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

  getUsuarios = (): BehaviorSubject<Usuario[]> => {
    const usuarios = new BehaviorSubject(null);
    this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(usuarios);
    return usuarios;
  }

  getUsuario = (id: string): BehaviorSubject<Usuario> => {
    const usuario = new BehaviorSubject(null);
    this.collection.doc<Usuario>(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Usuario;
        return { id, ...data };
      })
    ).subscribe(usuario);
    return usuario;
  }

  updateUsuario = (id: string, usuario: Usuario) => {
    this.collection.doc(id).update(usuario);
  }

  addUsuario = (usuario: Usuario): string => {
    const id = this.db.createId();
    this.collection.doc(id).set(usuario);
    return id;
  }

  deleteUsuario = (usuario: Usuario) => {
    this.collection.doc<Usuario>(usuario.id).delete();
  }
}
