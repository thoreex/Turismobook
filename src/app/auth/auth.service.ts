import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Usuario } from '../usuarios/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, NavigationExtras } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuario$: Observable<Usuario>;
  redirectUrl: string;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.usuario$ = this.afAuth.authState.pipe(
      switchMap(usuario => {
        // Logged in
        if (usuario) {
          return this.afs.doc<Usuario>(`users/${usuario.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  redirect() {
    // Get the redirect URL from our auth service
    // If no redirect has been set, use the default
    const redirect = this.redirectUrl ? this.router.parseUrl(this.redirectUrl) : '/admin';

    // Set our navigation extras object
    // that passes on our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };

    // Redirect the user
    this.router.navigateByUrl(redirect, navigationExtras);
  }

  async gglSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    this.redirect();
  }

  async fbSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    this.redirect();
  }

  private updateUserData(usuario: firebase.User) {
    const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`users/${usuario.uid}`);

    const data = {
      id: usuario.uid,
      email: usuario.email,
      nombre: usuario.displayName,
      imagen: usuario.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
