import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResenasListComponent } from './resenas-list/resenas-list.component';
import { ResenasDetailComponent } from './resenas-detail/resenas-detail.component';
import { ResenasUpsertComponent } from './resenas-upsert/resenas-upsert.component';

const routes: Routes = [
  { path: 'resenas', component: ResenasListComponent },
  { path: 'resenas/:id', component: ResenasDetailComponent},
  { path: 'resenas/editar/:resena', component: ResenasUpsertComponent},
  { path: 'resenas/nuevo/:centro', component: ResenasUpsertComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResenasRoutingModule { }
