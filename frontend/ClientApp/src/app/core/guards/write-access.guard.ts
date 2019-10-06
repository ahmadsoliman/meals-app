import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthorizationService } from '@app/core/auth/';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WriteAccessGuard implements CanActivate {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const screenId: number = route.data['access'];
    if (!this.authorizationService.isWriteAllowed(screenId)) {

      return false;
    }
    return true;
  }
}
