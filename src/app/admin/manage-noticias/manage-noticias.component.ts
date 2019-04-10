import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoticiasService } from 'src/app/noticias/noticias.service';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from 'src/app/noticias/noticia';

@Component({
  selector: 'app-manage-noticias',
  templateUrl: './manage-noticias.component.html',
  styleUrls: ['./manage-noticias.component.css']
})
export class ManageNoticiasComponent implements OnInit {
  private Id: number;
  public formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private formBuilder: FormBuilder) {

    this.iniciarNoticia();
    this.Id = +this.route.snapshot.params.id;

    this.cargarNoticia(this.Id);

  }

  ngOnInit() {
  }

  iniciarNoticia = () => {
    this.formGroup = this.formBuilder.group({
      id: ['(nueva)', [Validators.required]],
      titulo: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(15)]],
      fechaCreacion: [new Date()],
      ultimaModificacion: [new Date()],
    });
  }

  guardarData = () => {
    if (this.formGroup.valid) {
      let noticiaIndex = -1;
      let listaNoticias: Noticia[];
      this.noticiasService.getNoticias().subscribe(noticias => listaNoticias = noticias);
      listaNoticias.forEach((noticia, index) => {
        if (noticia.id === this.formGroup.value.id) {
          noticiaIndex = index;
        }
      });

      if (noticiaIndex >= 0) {
        this.formGroup.patchValue({ ultimaModificacion: new Date() });
        listaNoticias[noticiaIndex] = this.formGroup.value;
      } else {
        this.formGroup.patchValue({ id: listaNoticias.length });
        listaNoticias.push(this.formGroup.value);
      }

      // this.StorageService.setObjectValue(this.Key, listaNoticias);
      // console.log(this.StorageService.getObjectValue(this.Key));

      alert('Información guardada');
    } else {
      alert('Debe completar la información correctamente');
    }
  }

  cargarNoticia = (id: number) => {
    let listaNoticias: Noticia[];
    this.noticiasService.getNoticias().subscribe(noticias => listaNoticias = noticias);
    listaNoticias.forEach(noticia => {
      if (noticia.id === id) {
        console.log(this.formGroup);
        this.formGroup = this.formBuilder.group({
          id: [id, [Validators.required]],
          titulo: [noticia.titulo, [Validators.required]],
          imagen: [noticia.imagen, [Validators.required]],
          descripcion: [noticia.descripcion, [Validators.required, Validators.minLength(15)]],
          fechaCreacion: [noticia.fechaCreacion],
          ultimaModificacion: [noticia.ultimaModificacion],
        });
      }
    });
  }

}
