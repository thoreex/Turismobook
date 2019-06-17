import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroDetailComponent } from './centro-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

describe('CentroDetailComponent', () => {
  let component: CentroDetailComponent;
  let fixture: ComponentFixture<CentroDetailComponent>;

  const FireAuthStub = {
    authState: of({ uid: 'ABC123' })
  };

  const FireStorageStub = {
    ref: (path: string) => ({
      getDownloadURL: () => of(path)
    })
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
    }),
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroDetailComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: AngularFireAuth, useValue: FireAuthStub },
        { provide: AngularFireStorage, useValue: FireStorageStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
