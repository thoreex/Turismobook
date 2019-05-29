import { Injectable } from '@angular/core';

import { Usuario } from '../usuarios/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuario$: Observable<Usuario>;
  redirectUrl: string;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    this.usuario$ = this.afAuth.authState.pipe(
      switchMap(usuario => {
        // Logged in
        if (usuario) {
          return this.afs.doc<Usuario>(`users/${usuario.uid}`).snapshotChanges().pipe(
            map(a => {
              const data = a.payload.data() as Usuario;
              const id = a.payload.id;
              return { id, ...data };
            })
          );
        // Logged out
        } else {
          return of(null);
        }
      })
    );
  }

  async fbSignin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(usuario: firebase.User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`users/${usuario.uid}`);

    const data: Usuario = {
      id: usuario.uid,
      nombre: usuario.displayName,
      imagen: usuario.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  /*login(usuario: string, contrasena: string): Observable<boolean> {
    return this.checkCredenciales(usuario, contrasena).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = val)
    );
  }
  checkCredenciales(usuario: string, contrasena: string): Observable<boolean> {
    let usuarios: Usuario[];
    this.usuariosService.getUsuarios().subscribe(us => usuarios = us);
    this.oUsuario = usuarios.find(oUsuario => oUsuario.usuario === usuario && oUsuario.contrasena === contrasena);
    return of(this.oUsuario ? true : false);
  }

  logout(): void {
    this.isLoggedIn = false;
  }*/
}
