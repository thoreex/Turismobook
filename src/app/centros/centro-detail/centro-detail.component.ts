import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentrosService } from '../centros.service';
import { Centro } from '../centro';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/usuarios/usuario';

@Component({
  selector: 'app-centro-detail',
  templateUrl: './centro-detail.component.html',
  styleUrls: ['./centro-detail.component.css']
})
export class CentroDetailComponent implements OnInit {
  c: Centro;
  u: Usuario;
  centro$: Observable<Centro>;
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;

  constructor(private centrosService: CentrosService, private authService: AuthService,
              private route: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getCentro();
    this.getUsuario();
  }

  getCentro() {
    const id = this.route.snapshot.paramMap.get('id');
    this.centro$ = this.centrosService.getCentro(id);
    this.centro$.subscribe(centro => this.c = centro);
  }

  getUsuario() {
    this.authService.usuario$.
      subscribe(usuario => this.u = usuario);
  }

  sanitizerUrl() {
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.c.video;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }

  isResena(): boolean {
    return this.u &&
      this.c.resenas &&
      this.c.resenas.some(resena => resena.usuario.id === this.u.id);
  }

  follow() {
    // seguir/desseguir centro
    const loggedUser = this.u;
    if (loggedUser) {
      // en caso de seguidores ser undefined
      if (!loggedUser.seguidores) {
        loggedUser.seguidores = [];
      }
      if (!this.c.seguidores) {
        this.c.seguidores = [];
      }
      // agregar/remover al usuario
      const cindex = loggedUser.seguidores.findIndex(centro => centro.id === this.c.id);
      if (cindex > -1) {
        loggedUser.seguidores.splice(cindex, 1);
      } else {
        loggedUser.seguidores.push({ id: this.c.id, nombre: this.c.nombre,
          descripcion: this.c.descripcion, imagen: this.c.imagen });
      }
      // agregar/remover al centro
      const uindex = this.c.seguidores.findIndex(usuario => usuario.id === loggedUser.id);
      if (uindex > -1) {
        this.c.seguidores.splice(uindex, 1);
      } else {
        this.c.seguidores.push({ id: loggedUser.id, nombre: loggedUser.nombre });
      }
    }
  }

  isFollowing(): boolean {
    return this.u &&
      this.c.seguidores &&
      this.c.seguidores.some(seguidor => seguidor.id === this.u.id);
  }
}
