import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentrosRoutingModule } from './centros-routing.module';
import { CentroListComponent } from './centro-list/centro-list.component';
import { CentroDetailComponent } from './centro-detail/centro-detail.component';

@NgModule({
  declarations: [CentroListComponent, CentroDetailComponent],
  imports: [
    CommonModule,
    CentrosRoutingModule
  ]
})
export class CentrosModule { }
