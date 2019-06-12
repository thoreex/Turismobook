import { Component, OnInit, OnDestroy } from '@angular/core';
import { CentrosService } from 'src/app/centros/centros.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { Centro } from 'src/app/centros/centro';
import { Usuario } from 'src/app/usuarios/usuario';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { AlertService } from 'src/app/alert.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-manage-editores',
  templateUrl: './manage-editores.component.html',
  styleUrls: ['./manage-editores.component.css']
})
export class ManageEditoresComponent implements OnInit, OnDestroy {
  placeholderEditor = 'Seleccione el Editor.';
  placeholderCentro = 'Seleccione el Centro.';
  bindLabel = 'nombre';
  usuario$: BehaviorSubject<Usuario>;
  centro$: BehaviorSubject<Centro>;
  selectedEditor: any;
  editoresList: Usuario[];
  selectedCentro: any;
  centrosList: Centro[];
  error: boolean;
  constructor(private centrosService: CentrosService,
              private usuariosService: UsuariosService,
              private alertService: AlertService) {}

  ngOnInit() {
    this.usuariosService.getUsuarios().subscribe(usuarios => this.editoresList = usuarios);
    this.centrosService.getCentros().subscribe(centros => this.centrosList = centros);
  }

  ngOnDestroy() {
    if (this.usuario$ && this.centro$) {
      this.centro$.unsubscribe();
      this.usuario$.unsubscribe();
    }
  }

  asignar() {
    if (this.selectedEditor) {
      this.usuario$ = this.usuariosService.getUsuario(this.selectedEditor.id);
      if (this.selectedCentro) {
        this.centro$ = this.centrosService.getCentro(this.selectedCentro.id);
        combineLatest(
          this.usuario$,
          this.centro$
        ).subscribe(([usuario, centro]) => {
          if (usuario && centro) {
            if (!centro.editor) {
              if (usuario) {
                if (usuario.rol === 'Editor') {
                  if (usuario.centros) {
                    usuario.centros.push({ id: centro.id, nombre: centro.nombre, descripcion: centro.descripcion, imagen: centro.imagen });
                  } else {
                    usuario.centros = [{ id: centro.id, nombre: centro.nombre, descripcion: centro.descripcion, imagen: centro.imagen }];
                  }
                  this.usuariosService.updateUsuario(usuario.id, usuario);
                  centro.editor = { id: usuario.id, email: usuario.email, nombre: usuario.nombre };
                  this.centrosService.updateCentro(centro.id, centro);
                  this.alertService.showAlert('Se asignó el editor ' + usuario.nombre + ' al centro ' + centro.nombre, false);
                  this.selectedCentro = null;
                  this.selectedEditor = null;
                  this.error = false;
                } else {
                  this.error = true;
                }
              } else {
                this.error = true;
              }
            } else {
              this.error = true;
            }
          }
        });
        if (this.error) {
          this.alertService.showAlert('Error en la operación: Usuario no es editor / Usuario no existe / Centro ya tiene editor.', true);
        }
      } else {
        this.alertService.showAlert('Seleccione un centro!', true);
      }
    } else {
        this.alertService.showAlert('Seleccione un editor!', true);
    }
  }
}
