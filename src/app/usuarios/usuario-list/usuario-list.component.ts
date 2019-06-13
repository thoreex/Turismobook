import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  usuarios$: BehaviorSubject<Usuario[]>;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.getCentros();
  }

  getCentros() {
    this.usuarios$ = this.usuariosService.getUsuarios();
  }

}
