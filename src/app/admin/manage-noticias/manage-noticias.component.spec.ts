import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNoticiasComponent } from './manage-noticias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageNoticiasComponent', () => {
  let component: ManageNoticiasComponent;
  let fixture: ComponentFixture<ManageNoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageNoticiasComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
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
