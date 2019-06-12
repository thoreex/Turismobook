import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private collection: AngularFirestoreCollection<Usuario>;

  constructor(private readonly db: AngularFirestore, private alertService: AlertService) {
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
    try {
      this.collection.doc(id).update(usuario)
      .then(result => {
        this.alertService.showAlert('Usuario ' + id + ' actualizado.', false);
      })
      .catch(error => {
        this.alertService.showAlert('Error actualizando el usuario: ' + id, true);
      });
    } catch (error) {
      this.alertService.showAlert('Error general al actualizar usuario', true);
    }
  }

  addUsuario = (usuario: Usuario) => {
    try {
      this.collection.add(usuario)
      .then(result => {
        this.alertService.showAlert('Usuario ' + usuario.id + ' agregado.', false);
      })
      .catch(error => {
        this.alertService.showAlert('Error agregando el usuario: ' + usuario.id, true);
      });
    } catch (error) {
      this.alertService.showAlert('Error general al agregar usuario', true);
    }
  }

  deleteUsuario = (usuario: Usuario) => {
    try {
      this.collection.doc<Usuario>(usuario.id).delete()
      .then(result => {
        this.alertService.showAlert('Usuario ' + usuario.id + ' eliminado.', false);
      })
      .catch(error => {
        this.alertService.showAlert('Error eliminando el usuario: ' + usuario.id, true);
      });
    } catch (error) {
      this.alertService.showAlert('Error general al eliminar usuario', true);
    }
  }
}
