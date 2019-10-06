import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserApiService } from './api/user-api.service';
import { AuthorizationService, ModuleAuthorizationService } from './auth';
import { AuthService } from './auth/';
import { Auth0CustomUIService } from './auth/auth0';
import {
  LoggedInGuard,
  ReadAccessGuard,
  WriteAccessGuard
} from './guards/';
import { BearerInterceptor } from './http-interceptors/bearer-interceptor';
import { UnAuthorizedRequestsInterceptor } from './http-interceptors/unauthorized-requests-interceptor';

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot([]), HttpClientModule],
  providers: [
    LoggedInGuard,
    ReadAccessGuard,
    WriteAccessGuard,
    { provide: AuthorizationService, useClass: ModuleAuthorizationService },
    { provide: AuthService, useClass: Auth0CustomUIService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnAuthorizedRequestsInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true },
    UserApiService
  ]
})
export class CoreModule { }
