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
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchCentrosComponent } from './search-centros/search-centros.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AdminDashboardComponent, AdminComponent, ManageEditoresComponent,
    ManageCentrosComponent, ManageNoticiasComponent, ListNoticiasComponent, SearchCentrosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    CarouselModule.forRoot(),
    AdminRoutingModule
  ]
})
export class AdminModule { }
