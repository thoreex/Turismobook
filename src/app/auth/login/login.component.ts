import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { take, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() { }

  login(usuario: string, contrasena: string) {
  }

  loginGgl() {
    this.authService.gglSignin();
  }

  loginFb() {
    this.authService.fbSignin();
  }

  logout() {
    this.authService.signOut();
  }
}
