import { Component, OnInit } from '@angular/core';

import { Centro } from '../../centros/centro';
import { CentrosService } from '../../centros/centros.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuarios/usuario';

@Component({
  selector: 'app-search-centros',
  templateUrl: './search-centros.component.html',
  styleUrls: ['./search-centros.component.css']
})
export class SearchCentrosComponent implements OnInit {
  centros: Centro[] = [];
  usuario: Usuario;
  filteredCentros: Centro[] = [];
  vacio = false;
  constructor( private centrosService: CentrosService, private authService: AuthService, private router: Router) {
    this.authService.usuario$.subscribe(usuario => this.usuario = usuario);
  }

  ngOnInit() {
    this.getCentros();
  }

  getCentros = () => {
    let centrosAll: Centro[];
    this.centrosService.getCentros().subscribe(centros => centrosAll = centros);
    this.centros = this.filteredCentros = centrosAll.filter(item => !item.fechaEliminacion && item.editor &&
                                   this.usuario && item.editor.id === this.usuario.id);
    return this.centros;
  }

  searchCentros = (term: string) => {
    this.vacio = true;
    if (!term) {
      this.filteredCentros = this.centros;
      this.vacio = false;
    } else {
      term = term.toLowerCase();
      this.filteredCentros = [];
      this.centros.forEach((item) => {
        if (item.nombre.toLowerCase().includes(term)) {
          this.filteredCentros.push(item);
        }
      });
    }
    if (this.filteredCentros.length > 0) {
      this.vacio = false;
    }
  }

  borrarData = (id: string) => {
    this.centros.forEach((item) => {
      if (item.id === id) {
        item.fechaEliminacion = new Date();
      }
    });
    this.usuario.centros.forEach((item) => {
      if (item.id === id) {
        item.fechaEliminacion = new Date();
      }
    });
    this.router.navigate(['admin']);
  }

}
