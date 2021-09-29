import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {

  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkLogIn();
  }

  checkLogIn(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn$.pipe(
        take(1),
        map(isLoggedIn => {
          if (isLoggedIn) return true;

          const localStoragedUser = JSON.parse(localStorage.getItem('learning-docs-user'));
          if (localStoragedUser) {
            this.authService.onUserLoggedIn(localStoragedUser);
            return true;
          }

          return this.router.parseUrl('/login');
        })
    );
  }
}
