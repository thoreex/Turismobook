import { TestBed } from '@angular/core/testing';

import { ResenasService } from './resenas.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

describe('ResenasService', () => {
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
    const service: ResenasService = TestBed.get(ResenasService);
    expect(service).toBeTruthy();
  });
});
