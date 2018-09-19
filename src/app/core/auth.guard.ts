import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { TokenStorage } from './token.storage';

@Injectable()
export class AuthGuard implements CanActivate {
    
  constructor(
    private router: Router, 
    private authService: AuthService,
    private token: TokenStorage) {}

  canActivate() {
      
      if (!!this.token.getLoggedInUser()) {
          // logged in so return true
          return true;
      }

      // not logged in so redirect to login page with the return url and return false
      this.router.navigate(['/login']);
      return false;
  }
}