import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPageComponent } from './first-page.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RouterTestingModule } from '@angular/router/testing';
import { CentrosModule } from 'src/app/centros/centros.module';

describe('FirstPageComponent', () => {
  let component: FirstPageComponent;
  let fixture: ComponentFixture<FirstPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstPageComponent ],
      imports: [ CarouselModule.forRoot(), CentrosModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
