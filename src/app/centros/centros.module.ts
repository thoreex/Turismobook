import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentrosRoutingModule } from './centros-routing.module';
import { CentroListComponent } from './centro-list/centro-list.component';
import { CentroDetailComponent } from './centro-detail/centro-detail.component';
import { FormsModule } from '@angular/forms';
import { CentroSearchComponent } from './centro-search/centro-search.component';

@NgModule({
  declarations: [CentroListComponent, CentroDetailComponent, CentroSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    CentrosRoutingModule
  ],
  exports: [
    CentroSearchComponent
  ]
})
export class CentrosModule { }
