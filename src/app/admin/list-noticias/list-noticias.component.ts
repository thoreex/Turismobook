import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/noticias/noticia';
import { NoticiasService } from 'src/app/noticias/noticias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-noticias',
  templateUrl: './list-noticias.component.html',
  styleUrls: ['./list-noticias.component.css']
})
export class ListNoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  check = false;

  constructor(private noticiasService: NoticiasService, private router: Router) { }

  ngOnInit() {
    this.getNoticias();
  }

  getNoticias() {
    let noticasAll: Noticia[];
    this.noticiasService.getNoticias().subscribe(centros => noticasAll = centros);
    this.noticias = noticasAll.filter(item => !item.fechaEliminacion);

    if (this.noticias.length > 0) {
      this.check = true;
    } else {
      this.check = false;
    }
  }

  borrarData = (id: number) => {
    this.noticias.forEach((item) => {
      if (item.id === id) {
        item.fechaEliminacion = new Date();
        this.router.navigate(['admin']);
      }
    });
  }
}
