import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageEditoresComponent } from './manage-editores/manage-editores.component';
import { ManageCentrosComponent } from './manage-centros/manage-centros.component';
import { ManageNoticiasComponent } from './manage-noticias/manage-noticias.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListNoticiasComponent } from './list-noticias/list-noticias.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@NgModule({
  declarations: [
    AdminDashboardComponent, AdminComponent, ManageEditoresComponent,
    ManageCentrosComponent, ManageNoticiasComponent, ListNoticiasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    CarouselModule.forRoot(),
    AdminRoutingModule
  ]
})
export class AdminModule { }
