import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasDetailComponent } from './resenas-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, of } from 'rxjs';

describe('ResenasDetailComponent', () => {
  let component: ResenasDetailComponent;
  let fixture: ComponentFixture<ResenasDetailComponent>;

  const FireAuthStub = {
    authState: of({ uid: 'ABC123' })
  };

  const FirestoreStub = {
    doc: (id: string) => ({
      snapshotChanges: () => new BehaviorSubject({
        payload: {
          data: () => ({
            nombre: 'test',
            usuario: { id: 'ABC123' }
          })
        }
      })
    }),
    collection: (name: string) => ({
      doc: (id: string) => ({
        snapshotChanges: () => new BehaviorSubject({
          payload: {
            data: () => ({
              nombre: 'test',
              usuario: { id: 'ABC123' }
            })
          }
        })
      }),
      snapshotChanges: () => new BehaviorSubject([])
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResenasDetailComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: AngularFireAuth, useValue: FireAuthStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResenasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
