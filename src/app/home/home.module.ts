import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CentrosModule } from '../centros/centros.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, ContactComponent, ServicesComponent, FirstPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule.forRoot(),
    CentrosModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
