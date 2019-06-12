import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/noticias/noticia';
import { NoticiasService } from 'src/app/noticias/noticias.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  noticias$: BehaviorSubject<Noticia[]>;

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.getNoticias();
  }

  getNoticias() {
    this.noticias$ = this.noticiasService.getNoticias();
  }

}
