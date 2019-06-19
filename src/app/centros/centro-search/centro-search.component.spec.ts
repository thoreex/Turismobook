import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroSearchComponent } from './centro-search.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

describe('CentroSearchComponent', () => {
  let component: CentroSearchComponent;
  let fixture: ComponentFixture<CentroSearchComponent>;

  const FirestoreStub = {
    collection: (name: string) => ({
      snapshotChanges: () => new BehaviorSubject([])
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroSearchComponent ],
      imports: [ FormsModule, RouterTestingModule ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
