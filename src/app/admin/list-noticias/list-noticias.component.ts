import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/noticias/noticia';
import { NoticiasService } from 'src/app/noticias/noticias.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-list-noticias',
  templateUrl: './list-noticias.component.html',
  styleUrls: ['./list-noticias.component.css']
})
export class ListNoticiasComponent implements OnInit {
  noticias$: BehaviorSubject<Noticia[]>;

  constructor(private noticiasService: NoticiasService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.getNoticias();
  }

  getNoticias() {
    this.noticias$ = this.noticiasService.getNoticias();
  }

  borrarData = async (noticia: Noticia) => {
    this.noticiasService.deleteNoticia(noticia);
    this.alertService.showAlert('Noticia eliminada!', false);
  }
}
