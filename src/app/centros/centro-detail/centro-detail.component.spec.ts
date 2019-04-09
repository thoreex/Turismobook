import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroDetailComponent } from './centro-detail.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CentroDetailComponent', () => {
  let component: CentroDetailComponent;
  let fixture: ComponentFixture<CentroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroDetailComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
