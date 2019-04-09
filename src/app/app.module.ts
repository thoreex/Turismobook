import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CentrosModule } from './centros/centros.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    CarouselModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    CentrosModule,
    AppRoutingModule // Siempre al final de todos los Modules con Routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
