import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResenasListComponent } from './resenas-list/resenas-list.component';
import { ResenasDetailComponent } from './resenas-detail/resenas-detail.component';
import { ResenasUpsertComponent } from './resenas-upsert/resenas-upsert.component';
import { ResenasComponent } from './resenas/resenas.component';

const routes: Routes = [
  {
    path: '',
    component: ResenasComponent,
    children: [
      {
        path: '',
        component: ResenasListComponent
      },
      {
        path: 'new',
        component: ResenasUpsertComponent
      },
      {
        path: 'edit/:id',
        component: ResenasUpsertComponent
      },
      {
        path: ':id',
        component: ResenasDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResenasRoutingModule { }
