import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentroListComponent } from './centro-list/centro-list.component';
import { CentroDetailComponent } from './centro-detail/centro-detail.component';
import { CentrosComponent } from './centros/centros.component';

const routes: Routes = [
  {
    path: '',
    component: CentrosComponent,
    children: [
      {
        path: '',
        component: CentroListComponent
      },
      {
        path: ':id/resenas',
        loadChildren: './resenas/resenas.module#ResenasModule'
      },
      {
        path: ':id',
        component: CentroDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentrosRoutingModule { }
