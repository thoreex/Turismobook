import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {
  usuario: Usuario;

  constructor(private usuariosService: UsuariosService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuariosService.getUsuario(id).
      subscribe(usuario => this.usuario = usuario);
  }

}
