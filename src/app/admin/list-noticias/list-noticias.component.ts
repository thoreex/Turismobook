import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/noticias/noticia';
import { NoticiasService } from 'src/app/noticias/noticias.service';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { AlertService } from 'src/app/alert.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-list-noticias',
  templateUrl: './list-noticias.component.html',
  styleUrls: ['./list-noticias.component.css']
})
export class ListNoticiasComponent implements OnInit {
  noticias$: BehaviorSubject<Noticia[]>;

  constructor(private noticiasService: NoticiasService,
              private router: Router,
              private storage: AngularFireStorage,
              private alertService: AlertService) { }

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

  uploadPhoto(event, id) {
    const file = event.target.files[0];
    const filePath = Math.random().toString(36).substring(2);
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).then(() => {
      combineLatest([
        fileRef.getDownloadURL(),
        this.noticiasService.getNoticia(id)
      ]).pipe(take(1)).subscribe(([downloadURL, noticia]) => {
        noticia.imagen = downloadURL;

        this.noticiasService.updateNoticia(noticia.id, noticia);
      });
    });
  }
}
