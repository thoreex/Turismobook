import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroSearchComponent } from './centro-search.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('CentroSearchComponent', () => {
  let component: CentroSearchComponent;
  let fixture: ComponentFixture<CentroSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroSearchComponent ],
      imports: [ FormsModule, RouterModule ]
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
