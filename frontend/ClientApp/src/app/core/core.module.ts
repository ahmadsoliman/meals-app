import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserApiService } from './api/user-api.service';
import { AuthService } from './auth/';
import {
  LoggedInGuard,
  AccessGuard
} from './guards/';
import { BearerInterceptor } from './http-interceptors/bearer-interceptor';
import { UnAuthorizedRequestsInterceptor } from './http-interceptors/unauthorized-requests-interceptor';

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot([]), HttpClientModule],
  providers: [
    LoggedInGuard,
    AccessGuard,
    AuthService,
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
