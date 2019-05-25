import { Component, OnInit } from '@angular/core';
import { CentrosService } from 'src/app/centros/centros.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { Centro } from 'src/app/centros/centro';
import { Usuario } from 'src/app/usuarios/usuario';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-editores',
  templateUrl: './manage-editores.component.html',
  styleUrls: ['./manage-editores.component.css']
})
export class ManageEditoresComponent implements OnInit {
  mensajeError: string;
  error: boolean;
  oUsuario: Observable<Usuario>;
  oCentro: Observable<Centro>;
  bindLabel = 'nombre';
  placeholderEditor = 'Seleccione el editor';
  selectedEditor: any;
  editoresList = this.usuariosService.getUsuariosA();
  placeholderCentro = 'Seleccione el centro';
  selectedCentro: any;
  centrosList = this.centrosSevice.getCentrosA();
  constructor(private centrosSevice: CentrosService, private usuariosService: UsuariosService, private fromBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  asignar() {
    this.error = false;

    if (this.selectedEditor) {
      this.oUsuario = this.usuariosService.getUsuario(this.selectedEditor.id);
      if (this.selectedCentro) {
        this.oCentro = this.centrosSevice.getCentro(this.selectedCentro.id);

        let c: Centro;
        let u: Usuario;

        this.oCentro.subscribe(centro => c = centro);
        this.oUsuario.subscribe(usuario => u = usuario);

        if (c) {
          if (!c.editor) {
            if (u) {
              if (u.rol === 'Editor') {
                if (u.centros) {
                  u.centros.push({ id: c.id, nombre: c.nombre, descripcion: c.descripcion, imagen: c.imagen });
                } else {
                  u.centros = [{ id: c.id, nombre: c.nombre, descripcion: c.descripcion, imagen: c.imagen }];
                }
                c.editor = { id: u.id, nombre: u.nombre };
              } else {
                this.mensajeError = 'El usuario no es editor!';
                this.error = true;
              }
            } else {
              this.mensajeError = 'El usuario no existe!';
              this.error = true;
            }
          } else {
            this.mensajeError = 'Centro ya tiene asociado un editor!';
            this.error = true;
          }
        } else {
          this.mensajeError = 'No existe el centro!';
          this.error = true;
        }
        console.log('Centro:' + JSON.stringify(c));
        console.log('Usuario:' + JSON.stringify(u));

      } else {
        this.mensajeError = 'Seleccione un centro!';
        this.error = true;
      }
    } else {
      this.mensajeError = 'Seleccione un editor!';
      this.error = true;
    }
  }
}
