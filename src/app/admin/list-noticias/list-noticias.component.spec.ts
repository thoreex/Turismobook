import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNoticiasComponent } from './list-noticias.component';

describe('ListNoticiasComponent', () => {
  let component: ListNoticiasComponent;
  let fixture: ComponentFixture<ListNoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNoticiasComponent ]
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
