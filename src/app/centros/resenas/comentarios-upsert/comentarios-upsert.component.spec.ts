import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosUpsertComponent } from './comentarios-upsert.component';

describe('ComentariosUpsertComponent', () => {
  let component: ComentariosUpsertComponent;
  let fixture: ComponentFixture<ComentariosUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentariosUpsertComponent ]
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
