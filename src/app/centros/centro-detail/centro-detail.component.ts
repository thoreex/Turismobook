import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentrosService } from '../centros.service';
import { Centro } from '../centro';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { map, switchMap, tap, withLatestFrom, take, mergeMap, startWith, last } from 'rxjs/operators';
import { Observable, combineLatest, of, zip, forkJoin, merge, concat, BehaviorSubject } from 'rxjs';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';

@Component({
  selector: 'app-centro-detail',
  templateUrl: './centro-detail.component.html',
  styleUrls: ['./centro-detail.component.css']
})
export class CentroDetailComponent implements OnInit, OnDestroy {
  centro$: BehaviorSubject<Centro>;
  isFollowing: boolean;
  isResena: boolean;
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;

  constructor(private centrosService: CentrosService,
              private usuariosService: UsuariosService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getCentro();
    this.getFollowing();
    this.getResena();

    this.centro$.subscribe(centro => {
      if (centro) {
        this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + centro.video;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
      }
    });
  }

  ngOnDestroy() {
    this.centro$.unsubscribe();
  }

  getCentro() {
    const id = this.route.snapshot.paramMap.get('id');
    this.centro$ = this.centrosService.getCentro(id);
  }

  getFollowing() {
    zip(
      this.authService.usuario$,
      this.centro$
    ).pipe(
      map(([usuario, centro]) => {
        return usuario && centro && usuario.seguidores && usuario.seguidores.some(seguidor => seguidor.id === centro.id);
      })
    ).subscribe(isFollowing => this.isFollowing = isFollowing);
  }

  getResena() {
    zip(
      this.authService.usuario$,
      this.centro$
    ).pipe(
      map(([usuario, centro]) => {
        return usuario && centro && usuario.resenas && usuario.resenas.some(resena => resena.usuario.id === centro.id);
      })
    ).subscribe(isResena => this.isResena = isResena);
  }

  follow() {
    combineLatest(
      this.authService.usuario$,
      this.centro$
    ).pipe(take(1)).subscribe(([usuario, centro]) => {
      if (usuario && centro) {
        if (!usuario.seguidores) {
          usuario.seguidores = [];
        }
        if (!centro.seguidores) {
          centro.seguidores = [];
        }
        // agregar/remover al usuario
        const cindex = usuario.seguidores.findIndex(ucentro => ucentro.id === centro.id);
        if (cindex > -1) {
          usuario.seguidores.splice(cindex, 1);
        } else {
          usuario.seguidores.push({ id: centro.id, nombre: centro.nombre,
            descripcion: centro.descripcion, imagen: centro.imagen });
        }
        // agregar/remover al centro
        const uindex = centro.seguidores.findIndex(cusuario => cusuario.id === usuario.id);
        if (uindex > -1) {
          centro.seguidores.splice(uindex, 1);
        } else {
          centro.seguidores.push({ id: usuario.id, nombre: usuario.nombre, imagen: usuario.imagen });
        }
        // actualizar firestore
        this.centrosService.updateCentro(centro);
        this.usuariosService.updateUsuario(usuario);
      }
    });
  }
}
