import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResenasListComponent } from './resenas-list/resenas-list.component';
import { ResenasDetailComponent } from './resenas-detail/resenas-detail.component';
import { ResenasUpsertComponent } from './resenas-upsert/resenas-upsert.component';
import { ResenasComponent } from './resenas/resenas.component';
import { ComentariosUpsertComponent } from './comentarios-upsert/comentarios-upsert.component';

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
        component: ResenasComponent,
        children: [
          { path: '', component: ResenasDetailComponent },
          { path: 'comments/new', component: ComentariosUpsertComponent },
          { path: 'comments/edit/:id', component: ComentariosUpsertComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResenasRoutingModule { }
