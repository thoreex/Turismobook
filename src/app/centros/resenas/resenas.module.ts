import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResenasRoutingModule } from './resenas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResenasDetailComponent } from './resenas-detail/resenas-detail.component';
import { ResenasUpsertComponent } from './resenas-upsert/resenas-upsert.component';
import { ResenasListComponent } from './resenas-list/resenas-list.component';
import { ResenasComponent } from './resenas/resenas.component';

@NgModule({
  declarations: [ResenasDetailComponent, ResenasUpsertComponent, ResenasListComponent, ResenasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ResenasRoutingModule
  ]
})
export class ResenasModule { }
