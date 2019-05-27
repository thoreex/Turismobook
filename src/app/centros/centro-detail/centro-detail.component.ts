import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentrosService } from '../centros.service';
import { Centro } from '../centro';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-centro-detail',
  templateUrl: './centro-detail.component.html',
  styleUrls: ['./centro-detail.component.css']
})
export class CentroDetailComponent implements OnInit {
  centro: Centro;
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;

  constructor(private centrosService: CentrosService, private authService: AuthService,
              private route: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getCentro();

    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.centro.video;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }

  getCentro() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.centrosService.getCentro(id).
      subscribe(centro => this.centro = centro);
  }

  follow() {
    // seguir/desseguir centro
    const loggedUser = this.authService.oUsuario;
    if (loggedUser) {
      // en caso de seguidores ser undefined
      if (!loggedUser.seguidores) {
        loggedUser.seguidores = [];
      }
      if (!this.centro.seguidores) {
        this.centro.seguidores = [];
      }
      // agregar/remover al usuario
      const cindex = loggedUser.seguidores.findIndex(centro => centro.id === this.centro.id);
      if (cindex > -1) {
        loggedUser.seguidores.splice(cindex, 1);
      } else {
        loggedUser.seguidores.push({ id: this.centro.id, nombre: this.centro.nombre,
          descripcion: this.centro.descripcion, imagen: this.centro.imagen });
      }
      // agregar/remover al centro
      const uindex = this.centro.seguidores.findIndex(usuario => usuario.id === loggedUser.id);
      if (uindex > -1) {
        this.centro.seguidores.splice(uindex, 1);
      } else {
        this.centro.seguidores.push({ id: loggedUser.id, nombre: loggedUser.nombre });
      }
    }
  }

  isFollowing(): boolean {
    return this.authService.oUsuario &&
      this.centro.seguidores &&
      this.centro.seguidores.some(seguidor => seguidor.id === this.authService.oUsuario.id);
  }
}
