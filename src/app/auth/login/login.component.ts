import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  ngOnInit() { }

  setMessage() {
    this.message = 'Logged ' + (this.authService.usuario$ ? 'out' : 'in');
  }

  login() {
    this.authService.fbSignin();
    this.message = 'Trying to log in ...';
  }

  logout() {
    this.authService.signOut();
    this.setMessage();
  }
}
