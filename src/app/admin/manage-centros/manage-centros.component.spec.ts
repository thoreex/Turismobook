import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCentrosComponent } from './manage-centros.component';

describe('ManageCentrosComponent', () => {
  let component: ManageCentrosComponent;
  let fixture: ComponentFixture<ManageCentrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCentrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
