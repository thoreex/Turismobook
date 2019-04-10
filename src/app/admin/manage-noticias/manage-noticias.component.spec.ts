import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNoticiasComponent } from './manage-noticias.component';

describe('ManageNoticiasComponent', () => {
  let component: ManageNoticiasComponent;
  let fixture: ComponentFixture<ManageNoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageNoticiasComponent ]
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
