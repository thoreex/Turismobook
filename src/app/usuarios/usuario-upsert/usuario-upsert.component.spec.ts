import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioUpsertComponent } from './usuario-upsert.component';

describe('UsuarioUpsertComponent', () => {
  let component: UsuarioUpsertComponent;
  let fixture: ComponentFixture<UsuarioUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
