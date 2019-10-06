import { HttpClient } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { Route, Router } from '@angular/router';
import { AuthService } from '@app/core';
import { UserApiService } from '@app/core/api';
import { Auth0CustomUIService } from '@app/core/auth/auth0';
import { UserState } from '@app/main/user/user.state';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { LoginWithEmailAndPassword } from './user.actions';

describe('User store', () => {
  let store: Store;
  let userApiServiceSpy: Partial<UserApiService> = {};
  let apiServiceSpy: Partial<HttpClient> = {};

  let auth: Partial<Auth0CustomUIService> = {};
  let route: Partial<Route> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UserState])],
      providers: [
        { provide: HttpClient, useValue: apiServiceSpy },
        { provide: UserApiService, useValue: userApiServiceSpy },
        { provide: AuthService, useValue: auth },
        { provide: Router, useValue: route }
      ]
    }).compileComponents();
    store = TestBed.get(Store);
    apiServiceSpy = TestBed.get(HttpClient);
    userApiServiceSpy = TestBed.get(UserApiService);
    auth = TestBed.get(AuthService);
    route = TestBed.get(Router);
  }));

  describe('Login', () => {
    fit('should have the right info in store', async(() => {
      // expect(store.selectSnapshot(UserState.getUser).toEqual({ intialized: true, user : {undefined} }));

      auth.login = jest.fn(() => of(userApiServiceSpy.login));
      auth.userloggedIn = jest.fn(() => Observable.of());

      store.dispatch(
        new LoginWithEmailAndPassword(
          'mohammed.yousry@thoughtdesign.com.au',
          'mohammed'
        )
      );

      // TODO route.path not defined
      // expect(route.path).toBe('CallBack');
    }));
  });
});
