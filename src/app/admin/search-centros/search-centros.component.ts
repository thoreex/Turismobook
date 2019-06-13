import { Component, OnInit } from '@angular/core';

import { Centro } from '../../centros/centro';
import { CentrosService } from '../../centros/centros.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { map, take, filter, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ResenasService } from 'src/app/centros/resenas/resenas.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { Resena } from 'src/app/centros/resenas/resena';
import { AlertService } from 'src/app/alert.service';
import { Usuario } from 'src/app/usuarios/usuario';

@Component({
  selector: 'app-search-centros',
  templateUrl: './search-centros.component.html',
  styleUrls: ['./search-centros.component.css']
})
export class SearchCentrosComponent implements OnInit {
  public centros$: BehaviorSubject<Centro[]>;
  public oCentros: Centro[];
  public filteredCentros: Centro[];
  public vacio = false;
  private idResena: string;
  private idCentro: string;
  public Crear = '-1';
  public resenas$: BehaviorSubject<Resena[]>;
  public usuarios$: BehaviorSubject<Usuario[]>;

  constructor(private authService: AuthService,
              private router: Router,
              private resenasService: ResenasService,
              private centrosService: CentrosService,
              private usuariosService: UsuariosService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.resenas$ = this.resenasService.getResenas();
    this.usuarios$ = this.usuariosService.getUsuarios();
    this.getCentros();
  }

  getCentros = () => {
    this.centros$ = this.centrosService.getCentros();
    combineLatest(
    this.authService.usuario$,
    this.centros$
    ).pipe( map(([usuario, centros]) => {
      if (centros) {
        return centros.filter(item => item.editor && usuario && item.editor.id === usuario.id);
      }
      return [];
    })).subscribe(centros => this.oCentros = this.filteredCentros = centros);
  }

  searchCentros = (term: string) => {
    this.vacio = true;
    if (!term) {
      this.filteredCentros = this.oCentros;
      this.vacio = false;
    } else {
      term = term.toLowerCase();
      this.filteredCentros = [];
      this.oCentros.forEach((item) => {
        if (item.nombre.toLowerCase().includes(term)) {
          this.filteredCentros.push(item);
        }
      });
    }
    if (this.filteredCentros.length > 0) {
      this.vacio = false;
    }
  }

  eliminarCentro = (id: string) => {
    combineLatest(
      this.resenas$,
      this.usuarios$
    ).subscribe(([resenas, usuarios]) => {
      if (resenas && usuarios) {
        usuarios.forEach(usuario => {
          if (usuario.centros) {
            usuario.centros.forEach((centro, index) => {
              if (centro.id === id) {
                usuario.centros.splice(index, 1);
              }
            });
          }
          if (usuario.seguidores) {
            usuario.seguidores.forEach((centro, index) => {
              if (centro.id === id) {
                usuario.seguidores.splice(index, 1);
              }
            });
          }
          if (usuario.resenas) {
            usuario.resenas.forEach((resena, index) => {
              if (resena.centro.id === id) {
                usuario.resenas.splice(index, 1);
              }
            });
          }

          // Importante actualizar la db
          this.usuariosService.updateUsuario(usuario.id, usuario);
        });

        resenas.forEach( resena => {
          // Eliminar resenas del usuario.
          if (resena.centro.id === id) {
            this.resenasService.deleteResena(resena);
          }
        });
        this.centrosService.deleteCentro({id});
        this.alertService.showAlert('Centro eliminado', false);
        // this.router.navigate(['/centros', this.idCentro]);
      }
    });
  }
}
