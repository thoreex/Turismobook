import { Component, OnInit } from '@angular/core';
import { ResenasService } from '../resenas.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Resena } from '../resena';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CentrosService } from '../../centros.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { Centro } from '../../centro';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-resenas-detail',
  templateUrl: './resenas-detail.component.html',
  styleUrls: ['./resenas-detail.component.css']
})
export class ResenasDetailComponent implements OnInit {
  resena$: BehaviorSubject<Resena>;
  centro$: BehaviorSubject<Centro>;

  constructor(private resenasService: ResenasService,
              private centrosService: CentrosService,
              private usuariosService: UsuariosService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getResena();
  }

  getResena() {
    const id = this.route.snapshot.paramMap.get('id').split(',');
    this.resena$ = this.resenasService.getResena(id[0]);
    this.centro$ = this.centrosService.getCentro(id[1]);
  }

  censurar(censurar: boolean) {
    combineLatest(
      this.authService.usuario$,
      this.centro$,
      this.resena$
    ).pipe(take(1)).subscribe(([usuario, centro, resena]) => {
      if (usuario && centro && resena) {
        // Censurar
        const cindex = usuario.resenas.findIndex(uresena => uresena.id === resena.id);
        const i = centro.resenas.findIndex(uresena => uresena.id === resena.id);
        if (cindex > -1 && i > -1) {
          usuario.resenas[cindex].censurar = censurar;
          centro.resenas[i].censurar = censurar;
          resena.censurar = censurar;
          // actualizar firestore
          this.resenasService.updateResena(resena.id, resena);
          this.centrosService.updateCentro(centro.id, centro);
          this.usuariosService.updateUsuario(usuario.id, usuario);
        }
      }
    });
  }

}
