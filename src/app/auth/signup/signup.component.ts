import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  error: string;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  get name() { return this.signupForm.get('name'); }

  get email() { return this.signupForm.get('email'); }

  get password() { return this.signupForm.get('password'); }

  signup() {
    this.authService.signUp(
      this.name.value,
      this.email.value,
      this.password.value
      );
  }

}
