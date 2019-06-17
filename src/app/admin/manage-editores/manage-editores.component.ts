import { Component, OnInit } from '@angular/core';
import { CentrosService } from 'src/app/centros/centros.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { Centro } from 'src/app/centros/centro';
import { Usuario } from 'src/app/usuarios/usuario';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-manage-editores',
  templateUrl: './manage-editores.component.html',
  styleUrls: ['./manage-editores.component.css']
})
export class ManageEditoresComponent implements OnInit {
  public placeholderEditor = 'Seleccione el Editor.';
  public placeholderCentro = 'Seleccione el Centro.';
  public bindLabel = 'nombre';
  public usuario$: BehaviorSubject<Usuario>;
  public centro$: BehaviorSubject<Centro>;
  public selectedEditor: any;
  public editoresList: Usuario[];
  public selectedCentro: any;
  public centrosList: Centro[];
  public error: boolean;
  public exito: boolean;
  public mensaje: string;
  public mensajeB: string;
  constructor(private centrosService: CentrosService,
              private usuariosService: UsuariosService,
              private alertService: AlertService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.usuariosService.getUsuarios().subscribe(usuarios => this.editoresList = usuarios);
    this.centrosService.getCentros().subscribe(centros => this.centrosList = centros);
  }

  asignar() {
    this.error = false;
    this.exito = false;
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
                  this.exito = true;
                  this.mensaje = 'Se asignó el editor ' + usuario.nombre + ' al centro ';
                  this.selectedCentro = null;
                  this.selectedEditor = null;
                } else if (!this.exito) {
                  this.error = true;
                  this.mensaje = 'Usuario no es editor!';
                }
              } else if (!this.exito) {
                this.error = true;
                this.mensaje = 'Usuario no existe!';
              }
            } else if (!this.exito) {
              this.error = true;
              this.mensaje = 'Centro ya tiene editor!';
            }
          }
          this.alertService.showAlert(this.mensaje, this.error);
        });
      } else {
        this.alertService.showAlert('Seleccione un centro!', true);
      }
    } else {
        this.alertService.showAlert('Seleccione un editor!', true);
    }
  }
}
