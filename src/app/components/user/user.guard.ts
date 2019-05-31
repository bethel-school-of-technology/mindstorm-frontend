import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private userService: UserService, private router: Router) { }

    canActivate(
      _ROUTE: ActivatedRouteSnapshot,
      _STATE: RouterStateSnapshot
      ): boolean | Observable<boolean> | Promise<boolean> {
        const isAuth = this.userService.getIsAuth();
        if (!isAuth) {
            this.router.navigate(['/login']);
        }
        return isAuth;
      }
}
