import { Injectable } from '@angular/core';

import { of, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Usuario } from '../usuarios/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, NavigationExtras } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuario$: BehaviorSubject<Usuario> = new BehaviorSubject(null);
  redirectUrl: string;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.afAuth.authState.pipe(
      switchMap(usuario => {
        // Logged in
        if (usuario) {
          return this.afs.doc<Usuario>(`usuarios/${usuario.uid}`).snapshotChanges().pipe(
            map(a => {
              const data = a.payload.data() as Usuario;
              const id = a.payload.id;
              return { id, ...data };
            })
          );
        } else {
          // Logged out
          return of(null);
        }
      })
    ).subscribe(this.usuario$);
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

  async signUp(nombre: string, email: string, password: string) {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.createUserData(credential.user, nombre);
    this.redirect();
  }

  async signIn(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.redirect();
  }

  async gglSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    this.redirect();
  }

  async fbSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    this.redirect();
  }

  private createUserData(usuario: firebase.User, nombre: string) {
    const usuarioRef: AngularFirestoreDocument<Usuario> = this.afs.doc<Usuario>(`usuarios/${usuario.uid}`);

    const data: Usuario = {
      email: usuario.email,
      nombre,
      imagen: usuario.photoURL,
      rol: 'Basico',
      fechaCreacion: new Date()
    };

    return usuarioRef.set(data);
  }

  private updateUserData(usuario: firebase.User) {
    const usuarioRef: AngularFirestoreDocument<Usuario> = this.afs.doc<Usuario>(`usuarios/${usuario.uid}`);

    const data: Usuario = {
      email: usuario.email,
      nombre: usuario.displayName,
      imagen: usuario.photoURL,
      ultimaModificacion: new Date()
    };

    return usuarioRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
