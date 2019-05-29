import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasUpsertComponent } from './resenas-upsert.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ResenasUpsertComponent', () => {
  let component: ResenasUpsertComponent;
  let fixture: ComponentFixture<ResenasUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResenasUpsertComponent ],
      imports: [FormsModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResenasUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
