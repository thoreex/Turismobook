import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/noticias/noticia';
import { NoticiasService } from 'src/app/noticias/noticias.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
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
