import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  get email() { return this.signinForm.get('email'); }

  get password() { return this.signinForm.get('password'); }

  signin() {
    this.authService.signIn(
      this.email.value,
      this.password.value
      );
  }

  loginGgl() {
    this.authService.gglSignIn();
  }

  loginFb() {
    this.authService.fbSignIn();
  }

  logout() {
    this.authService.signOut();
  }
}
