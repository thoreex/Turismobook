import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CentrosService } from 'src/app/centros/centros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Centro } from 'src/app/centros/centro';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from 'src/app/usuarios/usuario';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { AlertService } from 'src/app/alert.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-manage-centros',
  templateUrl: './manage-centros.component.html',
  styleUrls: ['./manage-centros.component.css']
})
export class ManageCentrosComponent implements OnInit {
  private id;
  public formGroup: FormGroup;
  public Crear = -1;
  public rolEditor = 'Editor';
  public loggedUser: Usuario;
  public centro$: BehaviorSubject<Centro>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private centrosService: CentrosService,
    private usuarioService: UsuariosService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.iniciarCentro();
    if (this.id !== this.Crear) {
      this.cargarCentro(this.id);
    }
  }

  iniciarCentro = () => {
    this.formGroup = this.formBuilder.group({
      id: ['(nueva)', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(15)]],
      horarios: [''],
      imagen: ['', [Validators.required]],
      fotografias: [''],
      video: ['', [Validators.required]],
      seguidores: [''],
      resenas: [''],
      fechaCreacion: [new Date()],
      ultimaModificacion: [''],
      fechaEliminacion: [''],
      editor: [''],

    });
  }

  guardarData = () => {

    /*combineLatest(
      this.authService.usuario$,
      this.centro$
    ).pipe(take(1)).subscribe(([usuario, centro]) => {
      if (usuario && centro) {

      }
    });*/

    /*this.loggedUser = this.authService.oUsuario;
    let listaUsuarios: Usuario[];
    if (this.formGroup.valid) {
      let centroIndex = -1;

      let listaCentros: Centro[];
      this.centrosService.getCentros().subscribe(centros => listaCentros = centros);
      listaCentros.forEach((centro, index) => {
        if (centro.id === +this.formGroup.value.id) {
          centroIndex = index;
        }
      });

      if (centroIndex >= 0) {
        this.usuarioService.getUsuarios().subscribe(usuarios => listaUsuarios = usuarios);
        this.formGroup.patchValue({ ultimaModificacion: new Date() });
        this.formGroup.patchValue({ Editor:  {id: this.loggedUser.id, nombre: this.loggedUser.nombre}});
        listaCentros[centroIndex] = this.formGroup.value;
        listaUsuarios.forEach((usuario) => {
          if ( usuario.seguidores ) {
            const indexCentro = usuario.seguidores.findIndex(centro => centro.id === +this.formGroup.value.id);
            if ( indexCentro > -1 ) {
              usuario.seguidores[indexCentro] = this.formGroup.value;
            }
          }
        });
      } else {
        this.formGroup.patchValue({ id: listaCentros.length });
        this.formGroup.patchValue({ fechaCreacion: new Date() });
        this.formGroup.patchValue({ Editor:  {id: this.loggedUser.id, nombre: this.loggedUser.nombre}});
        listaCentros.push(this.formGroup.value);
      }
      // Redireccionar "Manage-Centros"
      this.Cancelar();
    } else {
      this.alertService.showAlert('Debe completar la información correctamente', false);
    }*/
  }

  cargarCentro = (id: string) => {
    this.centro$ = this.centrosService.getCentro(id);
    this.centro$.subscribe(centro => {
      if (centro) {
        this.formBuilder = new FormBuilder();
        this.formGroup = this.formBuilder.group({
        id: [id, [Validators.required]],
        nombre: [centro.nombre, [Validators.required]],
        descripcion: [centro.descripcion, [Validators.required, Validators.minLength(15)]],
        horarios: [centro.horarios],
        imagen: [centro.imagen, [Validators.required]],
        fotografias: [centro.fotografias],
        video: [centro.video, [Validators.required]],
        seguidores: [centro.seguidores],
        resenas: [centro.resenas],
        fechaCreacion: [centro.fechaCreacion],
        ultimaModificacion: [centro.ultimaModificacion],
        fechaEliminacion: [centro.fechaEliminacion],
        editor: [centro.editor]
        });
      }
    });
  }

  Cancelar() {
    this.router.navigate(['admin']);
  }

}
