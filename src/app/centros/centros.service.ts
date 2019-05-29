import { Injectable } from '@angular/core';
import { Centro } from './centro';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  private collection: AngularFirestoreCollection<Centro>;

  constructor(private readonly db: AngularFirestore) {
    this.collection = this.db.collection<Centro>('centros');
  }

  getCentros = (): Observable<Centro[]> => {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Centro;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getCentro = (id: string): Observable<Centro> => {
    return this.db.doc<Centro>('centros/' + id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Centro;
        return { id, ...data };
      })
    );
  }

}
