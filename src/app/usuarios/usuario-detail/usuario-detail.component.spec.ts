import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDetailComponent } from './usuario-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, of } from 'rxjs';

describe('UsuarioDetailComponent', () => {
  let component: UsuarioDetailComponent;
  let fixture: ComponentFixture<UsuarioDetailComponent>;

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
      declarations: [ UsuarioDetailComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: AngularFireAuth, useValue: FireAuthStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
