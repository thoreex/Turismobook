import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';
import { UsuarioUpsertComponent } from './usuario-upsert/usuario-upsert.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: UsuarioListComponent },
          { path: 'new', component: UsuarioUpsertComponent },
          { path: 'edit/:id', component: UsuarioUpsertComponent },
          { path: ':id', component: UsuarioDetailComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
