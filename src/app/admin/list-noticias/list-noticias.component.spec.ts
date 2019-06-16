import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNoticiasComponent } from './list-noticias.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

describe('ListNoticiasComponent', () => {
  let component: ListNoticiasComponent;
  let fixture: ComponentFixture<ListNoticiasComponent>;

  const FirestoreStub = {
    collection: (name: string) => ({
      snapshotChanges: () => new BehaviorSubject([{
        payload: {
          doc: {
            data: () => ({
              id: 'test1', nombre: 'Noticia de test #1',
              imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/1.jpg',
              descripcion: 'Descripcion de noticia de test #1',
              fechaCreacion: '2019-06-12T23:39:48.733212Z',
              ultimaModificacion: '2019-06-13T00:00:07.581664Z'
            })
          }
        }
      }, {
        payload: {
          doc: {
            data: () => ({
              id: 'test2', nombre: 'Noticia de test #2',
              imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/2.jpg',
              descripcion: 'Descripcion de noticia de test #2',
              fechaCreacion: '2019-06-12T23:39:48.733212Z',
              ultimaModificacion: '2019-06-13T00:00:07.581664Z'
            })
          }
        }
      }])
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListNoticiasComponent],
      imports: [CarouselModule.forRoot(), FontAwesomeModule, RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub }
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
