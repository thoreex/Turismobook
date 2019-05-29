import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasUpsertComponent } from './resenas-upsert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ResenasUpsertComponent', () => {
  let component: ResenasUpsertComponent;
  let fixture: ComponentFixture<ResenasUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResenasUpsertComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            parent: {
              snapshot: { params: of({ id: 0 }) }
            },
            snapshot: { params: of({ id: 0 }) }
          }
        }
      ]
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
