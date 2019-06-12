import { Injectable } from '@angular/core';
import { Resena } from './resena';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ResenasService {
  private collection: AngularFirestoreCollection<Resena>;

  constructor(private readonly db: AngularFirestore, private alertService: AlertService) {
    this.collection = this.db.collection<Resena>('resenas');
  }

  getResenas = (): BehaviorSubject<Resena[]> => {
    const resenas = new BehaviorSubject(null);
    this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Resena;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(resenas);
    return resenas;
  }

  getResena = (id: string): BehaviorSubject<Resena> => {
    const resena = new BehaviorSubject(null);
    this.collection.doc<Resena>(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Resena;
        return { id, ...data };
      })
    ).subscribe(resena);
    return resena;
  }

  updateResena = (id: string, resena: Resena) => {
    try {
      this.collection.doc(id).update(resena).then(result => {
        this.alertService.showAlert('Resena ' + id + ' actualizada.', false);
      })
      .catch(error => {
        this.alertService.showAlert('Error actualizando la resena: ' + id, true);
      });
    } catch (error) {
      this.alertService.showAlert('Error general al actualizar resena', true);
    }
  }

  addResena = (resena: Resena) => {
    try {
      this.collection.add(resena)
      .then(result => {
        this.alertService.showAlert('Resena ' + resena.id + ' agregada.', false);
      })
      .catch(error => {
        this.alertService.showAlert('Error agregando la resena: ' + resena.id, true);
      });
    } catch (error) {
      this.alertService.showAlert('Error general al agregar resena', true);
    }
  }

  deleteResena = (resena: Resena) => {
    try {
      this.collection.doc<Resena>(resena.id).delete()
      .then(result => {
        this.alertService.showAlert('Resena ' + resena.id + ' eliminada.', false);
      })
      .catch(error => {
        this.alertService.showAlert('Error eliminando la resena: ' + resena.id, true);
      });
    } catch (error) {
      this.alertService.showAlert('Error general al eliminar resena', true);
    }
  }
}
