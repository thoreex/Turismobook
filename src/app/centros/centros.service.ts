import { Injectable } from '@angular/core';
import { Centro } from './centro';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  private collection: AngularFirestoreCollection<Centro>;

  constructor(private readonly db: AngularFirestore) {
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
    this.collection.doc(id).update(centro);
  }

  addCentro = (centro: Centro): string => {
    const id = this.db.createId();
    this.collection.doc(id).set(centro);
    return id;
  }

  deleteCentro = (centro: Centro) => {
    this.collection.doc<Centro>(centro.id).delete();
  }
}
