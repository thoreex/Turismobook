import { Injectable } from '@angular/core';
import { Centro } from './centro';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  private collection: AngularFirestoreCollection<Centro>;

  constructor(private readonly db: AngularFirestore, private alertService: AlertService) {
    this.collection = this.db.collection<Centro>('centros');
  }

  getCentros = (): BehaviorSubject<Centro[]> => {
    const centros = new BehaviorSubject(null);
    this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Centro;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(centros);
    return centros;
  }

  getCentro = (id: string): BehaviorSubject<Centro> => {
    const centro = new BehaviorSubject(null);
    this.collection.doc<Centro>(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Centro;
        return { id, ...data };
      })
    ).subscribe(centro);
    return centro;
  }

  updateCentro = (id: string, centro: Centro) => {
    try {
      this.collection.doc(id).update(centro)
      .then(result => {
        this.alertService.showAlert('Centro ' + id + ' actualizado.', false);
      })
      .catch(error => {
        this.alertService.showAlert('Error actualizando el centro: ' + id, true);
      });
    } catch (error) {
      this.alertService.showAlert('Error general al actualizar centro', true);
    }
  }

  addCentro = (centro: Centro) => {
    try {
      this.collection.add(centro)
      .then(result => {
        this.alertService.showAlert('Centro ' + centro.id + ' agregado.', false);
      })
      .catch(error => {
        this.alertService.showAlert('Error agregando el centro: ' + centro.id, true);
      });
    } catch (error) {
      this.alertService.showAlert('Error general al agregar centro', true);
    }
  }

  deleteCentro = (centro: Centro) => {
    try {
      this.collection.doc<Centro>(centro.id).delete()
      .then(result => {
        this.alertService.showAlert('Centro ' + centro.id + ' eliminado.', false);
      })
      .catch(error => {
        this.alertService.showAlert('Error eliminando el centro: ' + centro.id, true);
      });
    } catch (error) {
      this.alertService.showAlert('Error general al eliminar centro', true);
    }
  }
}
