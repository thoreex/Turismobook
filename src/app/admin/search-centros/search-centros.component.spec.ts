import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCentrosComponent } from './search-centros.component';
import { RouterTestingModule } from '@angular/router/testing';
import {NgxPaginationModule} from 'ngx-pagination';

describe('SearchCentrosComponent', () => {
  let component: SearchCentrosComponent;
  let fixture: ComponentFixture<SearchCentrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCentrosComponent],
      imports: [ NgxPaginationModule, RouterTestingModule ]
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
