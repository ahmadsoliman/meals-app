import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '@app/core/auth/';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const accessLevel: number = route.data['access'] || 7;
    if (!this.auth.isAccessAllowed(accessLevel)) {
      this.router.navigate(['/']);
    }

    return this.auth.isAccessAllowed(accessLevel);
  }
}
