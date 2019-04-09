import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroListComponent } from './centro-list.component';
import { RouterModule } from '@angular/router';

describe('CentroListComponent', () => {
  let component: CentroListComponent;
  let fixture: ComponentFixture<CentroListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroListComponent ],
      imports: [ RouterModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
