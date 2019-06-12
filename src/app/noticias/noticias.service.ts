import { Injectable } from '@angular/core';
import { Noticia } from './noticia';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/alert.service';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private noticias: AngularFirestoreCollection<Noticia>;

  constructor( private readonly db: AngularFirestore, private alertService: AlertService) {
    this.noticias = this.db.collection<Noticia>('noticias');
  }

  getNoticias = (): BehaviorSubject<Noticia[]> => {
    const noticias = new BehaviorSubject(null);
    this.noticias.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Noticia;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(noticias);
    return noticias;
  }

  getNoticia = (id: string): BehaviorSubject<Noticia> => {
    const noticia = new BehaviorSubject(null);
    this.noticias.doc<Noticia>(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Noticia;
        return { id, ...data };
      })
    ).subscribe(noticia);
    return noticia;
  }

  updateNoticia = (id: string, noticia: Noticia) => {
    try {
      this.noticias.doc<Noticia>(id).update(noticia)
      .then(result => {
        this.alertService.showAlert('Noticia ' + id + ' actualizada.', false);
      })
      .catch(error => {
        this.alertService.showAlert('Error actualizando la noticia: ' + id, true);
      });
    } catch (error) {
      this.alertService.showAlert('Error general al actualizar noticia', true);
    }
  }

  addNoticia = (noticia: Noticia) => {
    try {
      this.noticias.add(noticia)
      .then(result => {
        this.alertService.showAlert('Noticia ' + noticia.id + ' agregada.', false);
      })
      .catch(error => {
        this.alertService.showAlert('Error agregando la noticia: ' + noticia.id, true);
      });
    } catch (error) {
      this.alertService.showAlert('Error general al agregar noticia', true);
    }
  }

  deleteNoticia = (noticia: Noticia) => {
    try {
      this.noticias.doc<Noticia>(noticia.id).delete()
      .then(result => {
        this.alertService.showAlert('Noticia ' + noticia.id + ' eliminada.', false);
      })
      .catch(error => {
        this.alertService.showAlert('Error eliminando la noticia: ' + noticia.id, true);
      });
    } catch (error) {
      this.alertService.showAlert('Error general al eliminar noticia', true);
    }
  }
}
