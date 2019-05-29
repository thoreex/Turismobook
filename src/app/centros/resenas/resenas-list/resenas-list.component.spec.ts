import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasListComponent } from './resenas-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ResenasListComponent', () => {
  let component: ResenasListComponent;
  let fixture: ComponentFixture<ResenasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResenasListComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResenasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
