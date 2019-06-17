import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentrosRoutingModule } from './centros-routing.module';
import { CentroListComponent } from './centro-list/centro-list.component';
import { CentroDetailComponent } from './centro-detail/centro-detail.component';
import { CentroSearchComponent } from './centro-search/centro-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CentrosComponent } from './centros/centros.component';

@NgModule({
  declarations: [CentroListComponent, CentroDetailComponent, CentroSearchComponent, CentrosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CentrosRoutingModule
  ],
  exports: []
})
export class CentrosModule { }
