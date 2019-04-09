import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroSearchComponent } from './centro-search.component';

describe('CentroSearchComponent', () => {
  let component: CentroSearchComponent;
  let fixture: ComponentFixture<CentroSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
