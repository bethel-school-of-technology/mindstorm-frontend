import { CanActivate } from '@angular/router/src/utils/preactivation';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '../../shared/service/user.service';

/** Guards routes in {@link AppRoutingModule} */
@Injectable()
export class UserGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  /** @ignore */
  constructor(private userService: UserService, private router: Router) {}

  /** Guards routes by checking user authentication */
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
