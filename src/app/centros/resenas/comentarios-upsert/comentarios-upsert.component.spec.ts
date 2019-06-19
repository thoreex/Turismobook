import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosUpsertComponent } from './comentarios-upsert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

describe('ComentariosUpsertComponent', () => {
  let component: ComentariosUpsertComponent;
  let fixture: ComponentFixture<ComentariosUpsertComponent>;

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
      declarations: [ ComentariosUpsertComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            parent: {
              snapshot: { params: of({ id: 0 }) }
            },
            snapshot: { params: of({ id: 0 }) }
          }
        },
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: AngularFireAuth, useValue: FireAuthStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
