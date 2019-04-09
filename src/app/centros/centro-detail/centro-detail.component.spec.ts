import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroDetailComponent } from './centro-detail.component';
import { RouterModule } from '@angular/router';

describe('CentroDetailComponent', () => {
  let component: CentroDetailComponent;
  let fixture: ComponentFixture<CentroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroDetailComponent ],
      imports: [ RouterModule ]
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
