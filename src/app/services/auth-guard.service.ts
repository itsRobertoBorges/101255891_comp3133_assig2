import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { USER_TYPE } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  authenticated = false;
  adminCheck = false;

  constructor(private authService: AuthService, private router: Router) {
    authService.getIsAuthenticated().subscribe(res => {
      this.authenticated = res;
    })
    authService.getIsAdmin().subscribe(res => {
      this.adminCheck = res;
    })
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticated) {
      if (this.adminCheck === false && route.data['roles'] === 'admin') {
        // if role isn't authorized
        this.router.navigate(['']);
        return false;
      }

      // Authenticated? return true
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}