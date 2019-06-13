import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
  constructor() {
    library.add(
      faSignInAlt,
      faUserPlus,
      faFacebook,
      faGoogle
      );
  }
}
