import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoticiasService } from 'src/app/noticias/noticias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Noticia } from 'src/app/noticias/noticia';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-manage-noticias',
  templateUrl: './manage-noticias.component.html',
  styleUrls: ['./manage-noticias.component.css']
})
export class ManageNoticiasComponent implements OnInit {
  private id: string;
  public formGroup: FormGroup;
  public Crear = '-1';
  public noticia$: BehaviorSubject<Noticia>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.iniciarNoticia();
    if (this.id !== this.Crear) {
      this.cargarNoticia();
    }
  }

  iniciarNoticia = () => {
    this.formBuilder = new FormBuilder();
    this.formGroup = this.formBuilder.group({
      id: ['(nueva)', [Validators.required]],
      titulo: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(15)]],
      fechaCreacion: [new Date()],
      ultimaModificacion: [new Date()],
    });
  }

  guardarNoticia = () => {
    if (this.formGroup.valid) {
      const nuevaNoticia = {
        titulo: this.formGroup.value.titulo,
        imagen: this.formGroup.value.imagen,
        descripcion: this.formGroup.value.descripcion,
        fechaCreacion: this.formGroup.value.fechaCreacion,
        ultimaModificacion: this.formGroup.value.ultimaModificacion
      };
      if (this.id === this.Crear) {
        this.noticiasService.addNoticia(nuevaNoticia);
        this.Cancelar();
        this.alertService.showAlert('Noticia agregada!', false);
      } else {
        this.noticiasService.updateNoticia(this.formGroup.value.id, nuevaNoticia);
        this.alertService.showAlert('Noticia modificada!', false);
      }
    }
  }

  cargarNoticia = () => {
    this.noticia$ = this.noticiasService.getNoticia(this.id);
    this.noticia$.subscribe(noticia => {
      if (noticia) {
        this.formBuilder = new FormBuilder();
        this.formGroup = this.formBuilder.group({
          id: [this.id, [Validators.required]],
          titulo: [noticia.titulo, [Validators.required]],
          imagen: [noticia.imagen, [Validators.required]],
          descripcion: [noticia.descripcion, [Validators.required, Validators.minLength(15)]],
          fechaCreacion: [new Date(+noticia.fechaCreacion.toString().slice(18, 28) * 1000)],
          ultimaModificacion: [new Date(+noticia.ultimaModificacion.toString().slice(18, 28) * 1000)]
        });
      }
    });
  }

  Cancelar = () => {
    this.router.navigate(['admin/noticias']);
  }
}
