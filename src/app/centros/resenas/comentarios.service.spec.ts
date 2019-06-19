import { TestBed } from '@angular/core/testing';

import { ComentariosService } from './comentarios.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

describe('ComentariosService', () => {

  const FirestoreStub = {
    collection: (name: string) => ({
      doc: (id: string) => ({
        snapshotChanges: () => new BehaviorSubject({
          payload: {
            data: () => ({
              nombre: 'test'
            })
          }
        })
      }),
      snapshotChanges: () => new BehaviorSubject([])
    })
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useValue: FirestoreStub }
    ]
  }));

  it('should be created', () => {
    const service: ComentariosService = TestBed.get(ComentariosService);
    expect(service).toBeTruthy();
  });
});
