import { NgModule, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Centro } from '../centros/centro';
import { Usuario } from '../usuarios/usuario';
import { Resena } from '../centros/resenas/resena';
import { Noticia } from '../noticias/noticia';

@Injectable()
export class AngularFirestoreStub {
  constructor(private readonly db: AngularFirestore) { }

  collection(name: string) {
    if (name === 'usuarios') {
      return this.db.collection<Usuario>('usuarios');
    } else if (name === 'centros') {
      return this.db.collection<Centro>('centros');
    } else if (name === 'resenas') {
      return this.db.collection<Resena>('resenas');
    } else if (name === 'noticias') {
      return this.db.collection<Noticia>('noticias');
    } else {
      return this.db.collection('');
    }
  }
}

@NgModule({
  providers: [{provide: AngularFirestore, useClass: AngularFirestoreStub}]
})
export class TestingModule { }
