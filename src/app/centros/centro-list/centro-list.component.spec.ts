import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroListComponent } from './centro-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

describe('CentroListComponent', () => {
  let component: CentroListComponent;
  let fixture: ComponentFixture<CentroListComponent>;

  const FirestoreStub = {
    collection: (name: string) => ({
      snapshotChanges: () => new BehaviorSubject([])
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroListComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
