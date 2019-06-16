import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CentrosService } from 'src/app/centros/centros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Centro } from 'src/app/centros/centro';
import { Usuario } from 'src/app/usuarios/usuario';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { AlertService } from 'src/app/alert.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { ResenasService } from 'src/app/centros/resenas/resenas.service';
import { Resena } from 'src/app/centros/resenas/resena';

@Component({
  selector: 'app-manage-centros',
  templateUrl: './manage-centros.component.html',
  styleUrls: ['./manage-centros.component.css']
})
export class ManageCentrosComponent implements OnInit {
  private id: string;
  public formGroup: FormGroup;
  public Crear = '-1';
  public rolEditor = 'Editor';
  public centro$: BehaviorSubject<Centro>;
  public resenas$: BehaviorSubject<Resena[]>;
  public usuarios$: BehaviorSubject<Usuario[]>;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private centrosService: CentrosService,
    private usuariosService: UsuariosService,
    private resenasService: ResenasService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.iniciarCentro();
    if (this.id !== this.Crear) {
      this.cargarCentro(this.id);
    }
    this.usuarios$ = this.usuariosService.getUsuarios();
    this.resenas$ = this.resenasService.getResenas();
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
      ultimaModificacion: [new Date()],
      fechaEliminacion: [''],
      editor: [''],

    });
  }

  guardarData = () => {
    if (this.formGroup.valid) {
      combineLatest(
        this.usuarios$,
        this.resenas$
      ).pipe(take(1)).subscribe(([usuarios, resenas]) => {
        if (usuarios && resenas) {
          const nuevoCentro: Centro = {
            nombre: this.formGroup.value.nombre,
            descripcion: this.formGroup.value.descripcion, imagen: this.formGroup.value.imagen,
            video: this.formGroup.value.video, resenas: this.formGroup.value.resenas,
            editor: this.formGroup.value.editor, seguidores: this.formGroup.value.seguidores,
            fotografias: this.formGroup.value.fotografias,
            fechaCreacion: this.formGroup.value.fechaCreacion, ultimaModificacion: new Date(),
            fechaEliminacion: this.formGroup.value.fechaEliminacion
          };
          if (this.id !== this.Crear) {
            this.centrosService.updateCentro(this.id, nuevoCentro);
            this.alertService.showAlert('Centro actualizado', false);
            const actualizadoCentro: Centro = {
              id: this.id, nombre: this.formGroup.value.nombre,
              descripcion: this.formGroup.value.descripcion, imagen: this.formGroup.value.imagen
            };
            resenas.forEach(resena => {
              if (resena.centro.id === this.id) {
                resena.centro = actualizadoCentro;
              }

              this.resenasService.updateResena(resena.id, resena);
            });
            usuarios.forEach(usuario => {
              if (usuario.centros) {
                usuario.centros.forEach((centro, index) => {
                  if (centro.id === this.id) {
                    usuario.centros[index] = actualizadoCentro;
                  }
                });
              }
              if (usuario.seguidores) {
                usuario.seguidores.forEach((centro, index) => {
                  if (centro.id === this.id) {
                    usuario.seguidores[index] = actualizadoCentro;
                  }
                });
              }
              if (usuario.resenas) {
                usuario.resenas.forEach(resena => {
                  if (resena.centro.id === this.id) {
                    resena.centro = actualizadoCentro;
                  }
                });
              }

              this.usuariosService.updateUsuario(usuario.id, usuario);
            });
          } else {
            this.centrosService.addCentro(nuevoCentro);
            this.alertService.showAlert('Centro agregado', false);
          }
        }
      });
    }
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
