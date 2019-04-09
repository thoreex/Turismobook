import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentroListComponent } from './centro-list/centro-list.component';
import { CentroSearchComponent } from './centro-search/centro-search.component';
import { CentroDetailComponent } from './centro-detail/centro-detail.component';

const routes: Routes = [
  { path: 'centros', component: CentroListComponent },
  { path: 'centros/search', component: CentroSearchComponent},
  { path: 'centros/:id', component: CentroDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentrosRoutingModule { }
