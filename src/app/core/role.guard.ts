import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import { TokenStorage } from './token.storage';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService,
          private token: TokenStorage) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!!this.token.getLoggedInUser()) {
        var expectedRoles = route.data.expectedRole;
        for(var i=0; i < expectedRoles.length; i++) {
            if(this.token.hasRole(expectedRoles[i])) {
                return true;
            }
        }
    }
      this.router.navigate(['login']);
      return false;
  }
}