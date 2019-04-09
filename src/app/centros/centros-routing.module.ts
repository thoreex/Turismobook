import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentroListComponent } from './centro-list/centro-list.component';
import { CentroDetailComponent } from './centro-detail/centro-detail.component';

const routes: Routes = [
  { path: 'centros', component: CentroListComponent },
  { path: 'centros/:id', component: CentroDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentrosRoutingModule { }
