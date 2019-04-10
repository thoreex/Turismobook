import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/noticias/noticia';
import { NoticiasService } from 'src/app/noticias/noticias.service';

@Component({
  selector: 'app-list-noticias',
  templateUrl: './list-noticias.component.html',
  styleUrls: ['./list-noticias.component.css']
})
export class ListNoticiasComponent implements OnInit {
  aNoticiaGuardada: Noticia[] = [];
  check = false;

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.getNoticias();
  }

  getNoticias() {
    this.noticiasService.getNoticias().subscribe(noticias => this.aNoticiaGuardada = noticias);
    if (this.aNoticiaGuardada.length > 0) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
}
