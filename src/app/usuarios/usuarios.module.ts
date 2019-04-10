import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioComponent } from './usuario/usuario.component';

@NgModule({
  declarations: [UsuarioDetailComponent, UsuarioListComponent, UsuarioComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
