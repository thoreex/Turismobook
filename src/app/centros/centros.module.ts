import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentrosRoutingModule } from './centros-routing.module';
import { CentroListComponent } from './centro-list/centro-list.component';
import { CentroDetailComponent } from './centro-detail/centro-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CentroListComponent, CentroDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    CentrosRoutingModule
  ]
})
export class CentrosModule { }
