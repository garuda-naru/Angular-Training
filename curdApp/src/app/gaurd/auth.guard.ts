import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';

@Injectable ({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public service: AuthService, public router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (this.service.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('from else');
      
      return false;
    }
  }
}