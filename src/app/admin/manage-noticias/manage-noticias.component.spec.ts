import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNoticiasComponent } from './manage-noticias.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

describe('ManageNoticiasComponent', () => {
  let component: ManageNoticiasComponent;
  let fixture: ComponentFixture<ManageNoticiasComponent>;

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
      })
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageNoticiasComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
