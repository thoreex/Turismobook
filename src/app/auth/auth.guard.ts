import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, CanLoad, Route,
  ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras
} from '@angular/router';
import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;

    return this.checkLogin(url, route);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;

    return this.checkLogin(url, null);
  }

  checkLogin(url: string, route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.usuario$.pipe(
      take(1),
      map(usuario => {
        const isLoggedIn = !!usuario;
        if (isLoggedIn) {
          const roles = route ? route.data.roles as Array<string> : null;
          return (roles == null || roles.indexOf(usuario.rol) !== -1);
        } else {
          // Store the attempted URL for redirecting
          this.authService.redirectUrl = url;

          // Create a dummy session id
          const sessionId = 123456789;

          // Set our navigation extras object
          // that contains our global query params and fragment
          const navigationExtras: NavigationExtras = {
            queryParams: { session_id: sessionId },
            fragment: 'anchor'
          };

          // Navigate to the login page with extras
          this.router.navigate(['/login'], navigationExtras);

          return false;
        }
      })
    );
  }
}
