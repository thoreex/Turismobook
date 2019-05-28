import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCentrosComponent } from './search-centros.component';

describe('SearchCentrosComponent', () => {
  let component: SearchCentrosComponent;
  let fixture: ComponentFixture<SearchCentrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCentrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
