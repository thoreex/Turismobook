import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CentrosService } from 'src/app/centros/centros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Centro } from 'src/app/centros/centro';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from 'src/app/usuarios/usuario';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';

@Component({
  selector: 'app-manage-centros',
  templateUrl: './manage-centros.component.html',
  styleUrls: ['./manage-centros.component.css']
})
export class ManageCentrosComponent implements OnInit {
  private Id: string;
  private usuario: Usuario;
  public formGroup: FormGroup;
  public Crear = -1;
  public rolEditor = 'Editor';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private centrosService: CentrosService,
    private usuarioService: UsuariosService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.authService.usuario$.subscribe(usuario => this.usuario = usuario);

    this.Id = this.route.snapshot.params.id;
    this.iniciarCentro();
    if (this.Id !== '-1') {
      this.cargarCentro(this.Id);
    }
   }

  ngOnInit() {
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
    let listaUsuarios: Usuario[];
    if (this.formGroup.valid) {
      let centroIndex = -1;

      let listaCentros: Centro[];
      this.centrosService.getCentros().subscribe(centros => listaCentros = centros);
      listaCentros.forEach((centro, index) => {
        if (centro.id === this.formGroup.value.id) {
          centroIndex = index;
        }
      });

      if (centroIndex >= 0) {
        this.usuarioService.getUsuarios().subscribe(usuarios => listaUsuarios = usuarios);
        this.formGroup.patchValue({ ultimaModificacion: new Date() });
        this.formGroup.patchValue({ Editor:  {id: this.usuario.id, nombre: this.usuario.nombre}});
        listaCentros[centroIndex] = this.formGroup.value;
        listaUsuarios.forEach((usuario) => {
          if ( usuario.seguidores ) {
            const indexCentro = usuario.seguidores.findIndex(centro => centro.id === this.formGroup.value.id);
            if ( indexCentro > -1 ) {
              usuario.seguidores[indexCentro] = this.formGroup.value;
            }
          }
        });
      } else {
        this.formGroup.patchValue({ id: listaCentros.length });
        this.formGroup.patchValue({ fechaCreacion: new Date() });
        this.formGroup.patchValue({ Editor:  {id: this.usuario.id, nombre: this.usuario.nombre}});
        listaCentros.push(this.formGroup.value);
      }
      console.log('LISTA: ' + JSON.stringify(this.formGroup.value));
      alert('Información guardada');
      // Redireccionar "Manage-Centros"
      this.Cancelar();
    } else {
      alert('Debe completar la información correctamente');
    }
  }

  cargarCentro = (id: string) => {
    let listaCentros: Centro[];
    this.centrosService.getCentros().subscribe(centros => listaCentros = centros);
    listaCentros.forEach(centro => {
      if (centro.id === id) {
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
          editor: [centro.editor],
        });
      }
    });
  }

  Cancelar() {
    this.router.navigate(['admin']);
  }

}
