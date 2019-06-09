import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../usuario';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {
  usuario$: Observable<Usuario>;

  constructor(private usuariosService: UsuariosService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    const id = this.route.snapshot.paramMap.get('id');
    this.usuario$ = this.usuariosService.getUsuario(id);
  }

}
