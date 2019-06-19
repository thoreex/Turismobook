import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, of } from 'rxjs';

describe('AuthGuard', () => {
  const FireAuthStub = {
    authState: of({ uid: 'ABC123' })
  };

  const FirestoreStub = {
    doc: (id: string) => ({
      snapshotChanges: () => new BehaviorSubject({
        payload: {
          data: () => ({
            nombre: 'test'
          })
        }
      })
    })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: AngularFireAuth, useValue: FireAuthStub }
      ],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
