import {
  Action,
  NgxsOnInit,
  Selector,
  State,
  StateContext
} from '@ngxs/store';

import { Navigate } from '@ngxs/router-plugin';

import { catchError, map } from 'rxjs/operators';

import { AuthService } from '@app/core/auth';
import { UserInfo, UserRegistration, AuthToken } from '@app/core/models';
import { throwError } from 'rxjs';
import {
  LoginWithEmailAndPassword,
  Signup
} from './user.actions';

export interface UserStateModel {
  user: UserInfo
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: UserInfo.createNew()
  }
})
export class UserState implements NgxsOnInit {
  constructor(
    private readonly auth: AuthService
  ) {}

  ngxsOnInit(ctx: StateContext<UserStateModel>) {
    console.log("user logg in");
    if(this.auth.isAuthenticated) {
      
      this.auth.userloggedIn().subscribe((user: UserInfo) => {
        ctx.patchState({
          user
        });
      });
    }
  }

  @Action(LoginWithEmailAndPassword)
  loginWithEmailAndPassword(
    ctx: StateContext<UserStateModel>,
    action: LoginWithEmailAndPassword
  ) {
    return this.auth.login(action.email, action.password).pipe(
      // tslint:disable-next-line
      map((data: AuthToken) => {
        this.auth.userloggedIn().subscribe((user: UserInfo) => {
          ctx.patchState({
            user
          });
        });
      }),
      catchError((error) => {
        ctx.patchState({
          user: undefined
        });
        return throwError(error);
      })
    );
  }

  @Action(Signup)
  signup(ctx: StateContext<UserRegistration>, action: Signup) {
    return this.auth.register(action.userRegistration).pipe(
      map((userId: string) =>
        ctx.dispatch(
          new LoginWithEmailAndPassword(
            action.userRegistration.email,
            action.userRegistration.password
          )
        )
      ),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

}
