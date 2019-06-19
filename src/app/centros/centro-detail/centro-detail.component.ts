import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentrosService } from '../centros.service';
import { Centro } from '../centro';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { map, take, finalize, switchMap } from 'rxjs/operators';
import { combineLatest, BehaviorSubject, Observable, of } from 'rxjs';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ResenasService } from '../resenas/resenas.service';
import { Resena } from '../resenas/resena';
import { Usuario } from 'src/app/usuarios/usuario';

@Component({
  selector: 'app-centro-detail',
  templateUrl: './centro-detail.component.html',
  styleUrls: ['./centro-detail.component.css']
})
export class CentroDetailComponent implements OnInit {
  centro$: BehaviorSubject<Centro>;
  usuarios$: BehaviorSubject<Usuario[]>;
  resenas$: BehaviorSubject<Resena[]>;
  isFollowing: boolean;
  isResena: boolean;
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;
  downloadURL: Observable<string>;

  constructor(private centrosService: CentrosService,
              private usuariosService: UsuariosService,
              private resenasService: ResenasService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private storage: AngularFireStorage,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getCentro();
    this.getFollowing();
    this.getResena();
    this.usuarios$ = this.usuariosService.getUsuarios();
    this.resenas$ = this.resenasService.getResenas();
    this.centro$.subscribe(centro => {
      if (centro) {
        this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + centro.video;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
      }
    });
  }

  getCentro() {
    const id = this.route.snapshot.paramMap.get('id');
    this.centro$ = this.centrosService.getCentro(id);
  }

  getFollowing() {
    combineLatest(
      this.authService.usuario$,
      this.centro$
    ).pipe(
      map(([usuario, centro]) => {
        return usuario && centro && usuario.seguidores && usuario.seguidores.some(seguidor => seguidor.id === centro.id);
      })
    ).subscribe(isFollowing => this.isFollowing = isFollowing);
  }

  getResena() {
    combineLatest(
      this.authService.usuario$,
      this.centro$
    ).pipe(
      map(([usuario, centro]) => {
        return usuario && centro && usuario.resenas && usuario.resenas.some(resena => resena.centro.id === centro.id);
      })
    ).subscribe(isResena => this.isResena = isResena);
  }

  censurar(resena: Resena, censurar: boolean) {
    combineLatest([
      this.usuarios$,
      this.resenas$,
      this.centro$
    ]).pipe(take(1)).subscribe(([usuarios, resenas, centro]) => {
      if (usuarios && resenas && centro) {
        // Censurar en centro
        const cindex = centro.resenas.findIndex(cresena => cresena.id === resena.id);
        if (cindex > -1) {
          centro.resenas[cindex].censurar = censurar;
          this.centrosService.updateCentro(centro.id, centro);
        }
        // Censurar en usuario
        usuarios.forEach(usuario => {
          if (usuario.resenas) {
            usuario.resenas.forEach((uresena, index) => {
              if (uresena.id === resena.id) {
                 uresena.censurar = censurar;
                 usuario.resenas[index] = uresena;
                 this.usuariosService.updateUsuario(usuario.id, usuario);
              }
            });
          }
        });
        // Censurar resena
        resenas.forEach(uresena => {
          if (uresena.id === resena.id) {
            uresena.censurar = censurar;
            this.resenasService.updateResena(resena.id, resena);
         }
        });
      }
    });
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
        this.centrosService.updateCentro(centro.id, centro);
        this.usuariosService.updateUsuario(usuario.id, usuario);
      }
    });
  }

  uploadProfile(event) {
    const file = event.target.files[0];
    // const filePath = `test/${new Date().getTime()}_${file.name}`;
    const filePath = Math.random().toString(36).substring(2);
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).then(() => {
      combineLatest([
        fileRef.getDownloadURL(),
        this.centro$
      ]).pipe(take(1)).subscribe(([downloadURL, centro]) => {
        centro.imagen = downloadURL;
        this.centrosService.updateCentro(centro.id, centro);
      });
    });
  }

  uploadPhoto(event) {
    const file = event.target.files[0];
    const filePath = Math.random().toString(36).substring(2);
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).then(() => {
      combineLatest([
        fileRef.getDownloadURL(),
        this.centro$
      ]).pipe(take(1)).subscribe(([downloadURL, centro]) => {
        if (!centro.fotografias) {
          centro.fotografias = [];
        }
        centro.fotografias.push(downloadURL);

        this.centrosService.updateCentro(centro.id, centro);
      });
    });
  }
}
