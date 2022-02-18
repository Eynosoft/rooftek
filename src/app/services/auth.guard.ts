import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isLoggedIn.pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          console.log('isLoggedIn='+isLoggedIn);
          if (!isLoggedIn) {
            this.router.navigate(['/user-pages/login']);
            return false;
          }
          return true;
        })
      );
  }
  
}
