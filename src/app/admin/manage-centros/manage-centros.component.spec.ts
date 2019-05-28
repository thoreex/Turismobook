import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCentrosComponent } from './manage-centros.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageCentrosComponent', () => {
  let component: ManageCentrosComponent;
  let fixture: ComponentFixture<ManageCentrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCentrosComponent ],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
