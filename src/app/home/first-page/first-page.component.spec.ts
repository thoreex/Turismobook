import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPageComponent } from './first-page.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RouterTestingModule } from '@angular/router/testing';
import { CentrosModule } from 'src/app/centros/centros.module';
import { CentroListComponent } from '../centro-list/centro-list.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

describe('FirstPageComponent', () => {
  let component: FirstPageComponent;
  let fixture: ComponentFixture<FirstPageComponent>;

  const FirestoreStub = {
    collection: (name: string) => ({
      snapshotChanges: () => new BehaviorSubject([])
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstPageComponent, CentroListComponent ],
      imports: [ CarouselModule.forRoot(), CentrosModule, RouterTestingModule ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
