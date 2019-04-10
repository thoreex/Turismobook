import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEditoresComponent } from './manage-editores.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageEditoresComponent', () => {
  let component: ManageEditoresComponent;
  let fixture: ComponentFixture<ManageEditoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEditoresComponent],
      imports: [FormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEditoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
