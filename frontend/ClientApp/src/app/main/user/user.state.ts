import {
  Action,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
  Store
} from '@ngxs/store';

import { Navigate } from '@ngxs/router-plugin';

import { catchError, map, take, tap } from 'rxjs/operators';

import { AuthService } from '@app/core/auth';
import { UserInfo, UserRegistration } from '@app/core/models';
import { throwError } from 'rxjs';
import {
  LoginRedirect,
  LoginSuccess,
  LoginWithEmailAndPassword,
  Signup
} from './user.actions';
import { UserAuthInfoStateModel } from './user.model';

@State<UserAuthInfoStateModel>({
  name: 'user',
  defaults: {
    initialized: false,
    user: undefined
  }
})
export class UserState implements NgxsOnInit {
  constructor(
    private readonly store: Store,
    private readonly auth: AuthService
  ) {}

  @Selector()
  static getUser(state: UserAuthInfoStateModel) {
    return state.user;
  }

  ngxsOnInit(ctx: StateContext<UserAuthInfoStateModel>) {}

  @Action(LoginWithEmailAndPassword)
  loginWithEmailAndPassword(
    ctx: StateContext<UserAuthInfoStateModel>,
    action: LoginWithEmailAndPassword
  ) {
    return this.auth.login(action.email, action.password).pipe(
      // tslint:disable-next-line
      map((data: any) => {
        ctx.dispatch(new LoginSuccess(data));
      }),
      catchError((error) => {
        ctx.patchState({
          user: undefined
        });
        ctx.dispatch(new LoginRedirect());
        return throwError(error);
      })
    );
  }

  @Action(Signup)
  signup(ctx: StateContext<UserRegistration>, action: Signup) {
    return this.auth.register(action.userRegistration).pipe(
      map((data: UserInfo) =>
        ctx.dispatch(
          new LoginWithEmailAndPassword(
            action.userRegistration.email,
            action.userRegistration.password
          )
        )
      ),
      catchError((error) => {
        ctx.dispatch(new LoginRedirect());
        return throwError(error);
      })
    );
  }

  @Action(LoginSuccess)
  onLoginSuccess(
    ctx: StateContext<UserAuthInfoStateModel>,
    action: LoginSuccess
  ) {
    this.auth.userloggedIn(action.authToken).subscribe(() => {
      ctx.dispatch(new Navigate(['/']));
    });
  }
}
