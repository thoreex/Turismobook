import { Injectable } from '@angular/core';
import { Resena } from './resena';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResenasService {
  private collection: AngularFirestoreCollection<Resena>;

  constructor(private readonly db: AngularFirestore) {
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
    this.collection.doc(id).update(resena);
  }

  addResena = (resena: Resena): string => {
    const id = this.db.createId();
    this.collection.doc(id).set(resena);
    return id;
  }

  deleteResena = (resena: Resena) => {
    this.collection.doc<Resena>(resena.id).delete();
  }
}
