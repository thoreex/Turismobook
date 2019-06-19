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
import { Usuario } from 'src/app/usuarios/usuario';

@Component({
  selector: 'app-resenas-detail',
  templateUrl: './resenas-detail.component.html',
  styleUrls: ['./resenas-detail.component.css']
})
export class ResenasDetailComponent implements OnInit {
  resena$: BehaviorSubject<Resena>;
  centro$: BehaviorSubject<Centro>;
  usuarios$: BehaviorSubject<Usuario[]>;
  idCentro: string;
  idResena: string;

  constructor(private resenasService: ResenasService,
              private centrosService: CentrosService,
              private usuariosService: UsuariosService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getResena();
    this.usuarios$ = this.usuariosService.getUsuarios();
  }

  getResena() {
    this.idCentro = this.route.parent.parent.snapshot.params.id;
    if (this.idCentro) {
      this.centro$ = this.centrosService.getCentro(this.idCentro);
    }

    this.idResena = this.route.snapshot.params.id;
    if (this.idResena) {
      this.resena$ = this.resenasService.getResena(this.idResena);
    }
  }

  censurar(resena: Resena, censurar: boolean) {
    combineLatest([
      this.usuarios$,
      this.centro$
    ]).pipe(take(1)).subscribe(([usuarios, centro]) => {
      if (usuarios && centro) {
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
        resena.censurar = censurar;
        this.resenasService.updateResena(resena.id, resena);
      }
    });
  }

}
