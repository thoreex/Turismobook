import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroListComponent } from './centro-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CentroListComponent', () => {
  let component: CentroListComponent;
  let fixture: ComponentFixture<CentroListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroListComponent ],
      imports: [ RouterTestingModule ]
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
