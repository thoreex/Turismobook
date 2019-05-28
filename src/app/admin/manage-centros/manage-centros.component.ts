import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CentrosService } from 'src/app/centros/centros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Centro } from 'src/app/centros/centro';

@Component({
  selector: 'app-manage-centros',
  templateUrl: './manage-centros.component.html',
  styleUrls: ['./manage-centros.component.css']
})
export class ManageCentrosComponent implements OnInit {
  private Id: number;
  public formGroup: FormGroup;
  public Crear = -1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private centrosService: CentrosService,
    private formBuilder: FormBuilder
  ) {
    this.Id = +this.route.snapshot.params.id;
    this.iniciarCentro();
    if (this.Id !== this.Crear) {
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
      imagen: ['', [Validators.required]],
      fotografias: ['', [Validators.required]],
      video: ['', [Validators.required]],
      fechaCreacion: [new Date()],
      ultimaModificacion: [new Date()],
      editorNombre: ['', [Validators.required]],
      editorId: ['', [Validators.required]]
    });
  }

  guardarData = () => {
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
        this.formGroup.patchValue({ ultimaModificacion: new Date() });
        listaCentros[centroIndex] = this.formGroup.value;
      } else {
        this.formGroup.patchValue({ id: listaCentros.length });
        listaCentros.push(this.formGroup.value);
      }

      alert('Información guardada');
      // Redireccionar "Manage-Noticias"
      this.Cancelar();
    } else {
      alert('Debe completar la información correctamente');
    }
  }

  cargarCentro = (id: number) => {
    let listaCentros: Centro[];
    this.centrosService.getCentros().subscribe(centros => listaCentros = centros);
    console.log(this.centrosService);
    listaCentros.forEach(centro => {
      if (centro.id === id) {
        this.formBuilder = new FormBuilder();
        this.formGroup = this.formBuilder.group({
          id: [id, [Validators.required]],
          nombre: [centro.nombre, [Validators.required]],
          descripcion: [centro.descripcion, [Validators.required, Validators.minLength(15)]],
          imagen: [centro.imagen, [Validators.required]],
          fotografias: [centro.fotografias, [Validators.required]],
          video: [centro.video, [Validators.required]],
          fechaCreacion: [centro.fechaCreacion],
          ultimaModificacion: [centro.ultimaModificacion],
          editorNombre: [centro.editor.nombre, [Validators.required]],
          editorId: [centro.editor.id, [Validators.required]]
        });
      }
    });
  }

  Cancelar() {
    this.router.navigate(['admin/manage-centros']);
  }

}
