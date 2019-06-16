import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEditoresComponent } from './manage-editores.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

describe('ManageEditoresComponent', () => {
  let component: ManageEditoresComponent;
  let fixture: ComponentFixture<ManageEditoresComponent>;

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
      snapshotChanges: () => new BehaviorSubject([{
        payload: {
          doc: {
            data: () => ({
              nombre: 'test'
            })
          }
        }
      }, {
        payload: {
          doc: {
            data: () => ({
              nombre: 'test'
            })
          }
        }
      }])
    }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEditoresComponent],
      imports: [FormsModule, NgSelectModule, RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEditoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
