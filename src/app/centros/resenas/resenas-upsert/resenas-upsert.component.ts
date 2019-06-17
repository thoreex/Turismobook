import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResenasService } from '../resenas.service';
import { Resena } from '../resena';
import { AuthService } from 'src/app/auth/auth.service';
import { CentrosService } from 'src/app/centros/centros.service';
import { Centro } from 'src/app/centros/centro';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { take } from 'rxjs/operators';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-resenas-upsert',
  templateUrl: './resenas-upsert.component.html',
  styleUrls: ['./resenas-upsert.component.css']
})
export class ResenasUpsertComponent implements OnInit {
  private idResena: string;
  private idCentro: string;
  public formGroup: FormGroup;
  public Crear = '-1';
  public resena$: BehaviorSubject<Resena>;
  public centro$: BehaviorSubject<Centro>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private resenasService: ResenasService,
              private centrosService: CentrosService,
              private usuariosService: UsuariosService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private alertService: AlertService) { }

  ngOnInit() {
    this.idCentro = this.route.parent.snapshot.params.id;
    if (this.idCentro) {
      this.centro$ = this.centrosService.getCentro(this.idCentro);
    }

    this.idResena = this.route.snapshot.params.id;
    this.iniciarResena();
    if (this.idResena) {
      this.cargarResena(this.idResena);
    }
  }

  iniciarResena = () => {
    this.formBuilder = new FormBuilder();
    this.formGroup = this.formBuilder.group({
      id: ['(nueva)', [Validators.required]],
      valoracion: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      titulo: ['', [Validators.required]],
      resena: ['', [Validators.required]],
      fechaCreacion: [new Date()],
      ultimaModificacion: [new Date()],
      fechaEliminacion: [''],
    });
  }

  guardarResena = () => {
    if (this.formGroup.valid) {
      // agregamos la resena duplicado a usuario y centro
      combineLatest(
        this.authService.usuario$,
        this.centro$
      ).pipe(take(1)).subscribe(([usuario, centro]) => {
        if (usuario && centro) {
          if (!usuario.resenas) {
            usuario.resenas = [];
          }
          if (!centro.resenas) {
            centro.resenas = [];
          }
          // datos limpios
          const centroLimpio = {
            id: centro.id, nombre: centro.nombre,
            descripcion: centro.descripcion, imagen: centro.imagen
          };
          const usuarioLimpio = {
            id: usuario.id, nombre: usuario.nombre, imagen: usuario.imagen
          };
          const nuevaResena = {
            centro: centroLimpio, usuario: usuarioLimpio,
            valoracion: this.formGroup.value.valoracion, titulo: this.formGroup.value.titulo,
            resena: this.formGroup.value.resena, fechaCreacion: this.formGroup.value.fechaCreacion,
            ultimaModificacion: this.formGroup.value.ultimaModificacion, fechaEliminacion: this.formGroup.value.fechaEliminacion
          };
          if (this.idResena) {
            this.resenasService.updateResena(this.idResena, nuevaResena);
            this.alertService.showAlert('Reseña actualizada', false);
          } else {
            this.idResena = this.resenasService.addResena(nuevaResena);
            this.alertService.showAlert('Reseña agregada', false);
          }
          // agregar/modificar al usuario
          const cindex = usuario.resenas.findIndex(resena => resena.centro.id === centro.id);
          const cresena = {
            id: this.idResena, centro: centroLimpio,
            valoracion: this.formGroup.value.valoracion, titulo: this.formGroup.value.titulo,
            resena: this.formGroup.value.resena, fechaCreacion: this.formGroup.value.fechaCreacion,
            ultimaModificacion: this.formGroup.value.ultimaModificacion, fechaEliminacion: this.formGroup.value.fechaEliminacion
          };
          if (cindex > -1) {
            usuario.resenas[cindex] = cresena;
          } else {
            usuario.resenas.push(cresena);
          }
          // agregar/modificar al centro
          const uindex = centro.resenas.findIndex(resena => resena.usuario.id === usuario.id);
          const uresena = {
            id: this.idResena, usuario: usuarioLimpio,
            valoracion: this.formGroup.value.valoracion, titulo: this.formGroup.value.titulo,
            resena: this.formGroup.value.resena, fechaCreacion: this.formGroup.value.fechaCreacion,
            ultimaModificacion: this.formGroup.value.ultimaModificacion, fechaEliminacion: this.formGroup.value.fechaEliminacion
          };
          if (uindex > -1) {
            centro.resenas[uindex] = uresena;
          } else {
            centro.resenas.push(uresena);
          }
          // actualizar firestore
          this.centrosService.updateCentro(centro.id, centro);
          this.usuariosService.updateUsuario(usuario.id, usuario);
          this.router.navigate(['/centers', this.idCentro, 'reviews', this.idResena]);
        }
      });
    }
  }

  eliminarResena = () => {
    combineLatest(
      this.resena$,
      this.authService.usuario$,
      this.centro$
    ).pipe(take(1)).subscribe(([resena, usuario, centro]) => {
      if (resena && usuario && centro) {
        // eliminar del usuario
        const cindex = usuario.resenas.findIndex(uresena => uresena.centro.id === centro.id);
        if (cindex > -1) {
          usuario.resenas.splice(cindex, 1);
        }
        // eliminar del centro
        const uindex = centro.resenas.findIndex(cresena => cresena.usuario.id === usuario.id);
        if (uindex > -1) {
          centro.resenas.splice(uindex, 1);
        }
        // actualizar firestore
        this.centrosService.updateCentro(centro.id, centro);
        this.usuariosService.updateUsuario(usuario.id, usuario);
        this.resenasService.deleteResena(resena);
        this.alertService.showAlert('Reseña eliminada', false);
        this.router.navigate(['/centers', this.idCentro]);
      }
    });
  }

  cargarResena = (id: string) => {
    this.resena$ = this.resenasService.getResena(id);
    this.resena$.subscribe(resena => {
      if (resena) {
        this.formBuilder = new FormBuilder();
        this.formGroup = this.formBuilder.group({
          id: [id, [Validators.required]],
          valoracion: [resena.valoracion, [Validators.required, Validators.min(1), Validators.max(5)]],
          titulo: [resena.titulo, [Validators.required]],
          resena: [resena.resena, [Validators.required]],
          fechaCreacion: [resena.fechaCreacion],
          ultimaModificacion: [resena.ultimaModificacion],
          fechaEliminacion: [resena.fechaEliminacion],
        });
      }
    });
  }
}
