import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNoticiasComponent } from './list-noticias.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

describe('ListNoticiasComponent', () => {
  let component: ListNoticiasComponent;
  let fixture: ComponentFixture<ListNoticiasComponent>;

  const FireStorageStub = {
    ref: (path: string) => ({
      getDownloadURL: () => of(path)
    })
  };

  const FirestoreStub = {
    collection: (name: string) => ({
      snapshotChanges: () => new BehaviorSubject([])
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListNoticiasComponent],
      imports: [CarouselModule.forRoot(), FontAwesomeModule, RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: AngularFireStorage, useValue: FireStorageStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
