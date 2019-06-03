import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResenasService } from '../resenas.service';
import { Resena } from '../resena';
import { AuthService } from 'src/app/auth/auth.service';
import { CentrosService } from 'src/app/centros/centros.service';
import { Centro } from 'src/app/centros/centro';

@Component({
  selector: 'app-resenas-upsert',
  templateUrl: './resenas-upsert.component.html',
  styleUrls: ['./resenas-upsert.component.css']
})
export class ResenasUpsertComponent implements OnInit {
  private idResena: number;
  private idCentro: number;
  private centro: Centro;
  public formGroup: FormGroup;
  public Crear = -1;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private resenasService: ResenasService,
              private centroService: CentrosService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.idCentro = +this.route.parent.snapshot.params.id;
    if (this.idCentro !== this.Crear) {
      this.centroService.getCentro(this.idCentro).subscribe(centro => this.centro = centro);
    }

    this.iniciarResena();
    this.idResena = +this.route.snapshot.params.id;
    if (this.idResena !== this.Crear) {
      this.cargarResena(this.idResena);
    }
  }

  ngOnInit() {
  }

  iniciarResena = () => {
    this.formGroup = this.formBuilder.group({
      id: ['(nueva)', [Validators.required]],
      centro: [''],
      usuario: [''],
      valoracion: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      titulo: ['', [Validators.required]],
      resena: ['', [Validators.required]],
      fechaCreacion: [new Date()],
      ultimaModificacion: [''],
      fechaEliminacion: [''],
    });
  }

  guardarData = () => {
    /*if (this.formGroup.valid) {
      let resenaIndex = -1;
      let listaResenas: Resena[];
      this.resenasService.getResenas().subscribe(resenas => listaResenas = resenas);
      listaResenas.forEach((resena, index) => {
        if (resena.id === +this.formGroup.value.id) {
          resenaIndex = index;
        }
      });

      if (resenaIndex >= 0) {
        this.formGroup.patchValue({ centro: {
          id: this.centro.id, nombre: this.centro.nombre,
          descripcion: this.centro.descripcion, imagen: this.centro.imagen
        }});
        this.formGroup.patchValue({ usuario: {
          id: this.authService.oUsuario.id, nombre: this.authService.oUsuario.nombre
        }});
        this.formGroup.patchValue({ ultimaModificacion: new Date() });
        listaResenas[resenaIndex] = this.formGroup.value;

        const uResenaIndex = this.authService.oUsuario.resenas.findIndex(
          resena => resena.id === +this.formGroup.value.id);
        this.authService.oUsuario.resenas[uResenaIndex] = {
          id: this.formGroup.value.id, centro: this.formGroup.value.centro,
          valoracion: this.formGroup.value.valoracion, titulo: this.formGroup.value.titulo,
          resena: this.formGroup.value.resena, fechaCreacion: this.formGroup.value.fechaCreacion,
          ultimaModificacion: this.formGroup.value.ultimaModificacion, fechaEliminacion: this.formGroup.value.fechaEliminacion
        };

        const cResenaIndex = this.centro.resenas.findIndex(
          resena => resena.id === +this.formGroup.value.id);
        this.centro.resenas[cResenaIndex] = {
          id: this.formGroup.value.id, usuario: this.formGroup.value.usuario,
          valoracion: this.formGroup.value.valoracion, titulo: this.formGroup.value.titulo,
          resena: this.formGroup.value.resena, fechaCreacion: this.formGroup.value.fechaCreacion,
          ultimaModificacion: this.formGroup.value.ultimaModificacion, fechaEliminacion: this.formGroup.value.fechaEliminacion
        };
      } else {
        this.formGroup.patchValue({ id: listaResenas.length });
        this.formGroup.patchValue({ centro: {
          id: this.centro.id, nombre: this.centro.nombre,
          descripcion: this.centro.descripcion, imagen: this.centro.imagen
        }});
        this.formGroup.patchValue({ usuario: {
          id: this.authService.oUsuario.id, nombre: this.authService.oUsuario.nombre
        }});
        this.formGroup.patchValue({ fechaCreacion: new Date() });
        listaResenas.push(this.formGroup.value);

        if (!this.authService.oUsuario.resenas) {
          this.authService.oUsuario.resenas = [];
        }
        this.authService.oUsuario.resenas.push({
          id: this.formGroup.value.id, centro: this.formGroup.value.centro,
          valoracion: this.formGroup.value.valoracion, titulo: this.formGroup.value.titulo,
          resena: this.formGroup.value.resena, fechaCreacion: this.formGroup.value.fechaCreacion,
          ultimaModificacion: this.formGroup.value.ultimaModificacion, fechaEliminacion: this.formGroup.value.fechaEliminacion
        });

        if (!this.centro.resenas) {
          this.centro.resenas = [];
        }
        this.centro.resenas.push({
          id: this.formGroup.value.id, usuario: this.formGroup.value.usuario,
          valoracion: this.formGroup.value.valoracion, titulo: this.formGroup.value.titulo,
          resena: this.formGroup.value.resena, fechaCreacion: this.formGroup.value.fechaCreacion,
          ultimaModificacion: this.formGroup.value.ultimaModificacion, fechaEliminacion: this.formGroup.value.fechaEliminacion
        });
      }

      // this.StorageService.setObjectValue(this.Key, listaNoticias);
      // console.log(this.StorageService.getObjectValue(this.Key));

      alert('Información guardada');
      // Redireccionar la reseña
      this.router.navigate(['/centros', this.centro.id, 'resenas', this.formGroup.value.id]);
    } else {
      alert('Debe completar la información correctamente');
    }*/
  }

  eliminarData = () => {
    /*let resenaIndex = -1;
    let listaResenas: Resena[];
    this.resenasService.getResenas().subscribe(resenas => listaResenas = resenas);
    listaResenas.forEach((resena, index) => {
      if (resena.id === +this.formGroup.value.id) {
        resenaIndex = index;
      }
    });

    const fechaEliminacion = new Date();
    listaResenas[resenaIndex].fechaEliminacion = fechaEliminacion;

    const uResenaIndex = this.authService.oUsuario.resenas.findIndex(
      resena => resena.id === +this.formGroup.value.id);
    this.authService.oUsuario.resenas[uResenaIndex].fechaEliminacion = fechaEliminacion;

    const cResenaIndex = this.centro.resenas.findIndex(
      resena => resena.id === +this.formGroup.value.id);
    this.centro.resenas[cResenaIndex].fechaEliminacion = fechaEliminacion; */
  }

  cargarResena = (id: number) => {
    /*let listaResenas: Resena[];
    this.resenasService.getResenas().subscribe(resenas => listaResenas = resenas);
    listaResenas.forEach(resena => {
      if (resena.id === id) {
        this.formGroup = this.formBuilder.group({
          id: [id, [Validators.required]],
          centro: [resena.centro],
          usuario: [resena.usuario],
          valoracion: [resena.valoracion, [Validators.required, Validators.min(1), Validators.max(5)]],
          titulo: [resena.titulo, [Validators.required]],
          resena: [resena.resena, [Validators.required]],
          fechaCreacion: [resena.fechaCreacion],
          ultimaModificacion: [resena.ultimaModificacion],
          fechaEliminacion: [resena.fechaEliminacion],
        });
      }
    });*/
  }

}
