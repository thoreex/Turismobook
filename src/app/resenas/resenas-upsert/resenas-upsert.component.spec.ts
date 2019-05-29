import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasUpsertComponent } from './resenas-upsert.component';

describe('ResenasUpsertComponent', () => {
  let component: ResenasUpsertComponent;
  let fixture: ComponentFixture<ResenasUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResenasUpsertComponent ]
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
