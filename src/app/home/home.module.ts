import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { CentroListComponent } from './centro-list/centro-list.component';

@NgModule({
  declarations: [HomeComponent, ContactComponent, ServicesComponent, FirstPageComponent, CentroListComponent],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule.forRoot(),
    HomeRoutingModule
  ]
})
export class HomeModule { }
