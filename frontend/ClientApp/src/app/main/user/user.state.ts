import {
  Action,
  NgxsOnInit,
  State,
  StateContext
} from '@ngxs/store';

import { Navigate } from '@ngxs/router-plugin';

import { catchError, map } from 'rxjs/operators';

import { AuthService } from '@app/core/auth';
import { UserInfo, AuthToken, UsersList } from '@app/core/models';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { throwError } from 'rxjs';
import {
  LoginWithEmailAndPassword,
  Signup,
  FetchUsers,
  DeleteUser
} from './user.actions';
import { UserApiService } from '@app/core/api/user-api.service';

export interface UserStateModel {
  loggedInUser: UserInfo,

  usersGridData: GridDataResult,
  usersLoading: boolean
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    loggedInUser: UserInfo.createNew(),

    usersGridData: { data: [], total: 0 },
    usersLoading: false
  }
})
export class UserState implements NgxsOnInit {
  constructor(
    private readonly auth: AuthService,
    private readonly userApi: UserApiService
  ) { }

  ngxsOnInit(ctx: StateContext<UserStateModel>) {
    if (this.auth.isAuthenticated()) {
      this.auth.userloggedIn().subscribe((user: UserInfo) => {
        ctx.patchState({
          loggedInUser: user
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
      map((data: AuthToken) => {
        this.auth.userloggedIn().subscribe((user: UserInfo) => {
          ctx.patchState({
            loggedInUser: user
          });
          ctx.dispatch(new Navigate(['/']));
        });
      }),
      catchError((error) => {
        ctx.patchState({
          loggedInUser: UserInfo.createNew()
        });
        return throwError(error);
      })
    );
  }

  @Action(Signup)
  signup(ctx: StateContext<UserStateModel>, action: Signup) {
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

  @Action(FetchUsers)
  fetchUsers(ctx: StateContext<UserStateModel>) {
    ctx.patchState({
      usersLoading: true
    });
    return this.userApi.getUsers().subscribe((usersList: UsersList) =>
      ctx.patchState({
        usersGridData: { data: usersList.users, total: usersList.total },
        usersLoading: false
      }) 
    );
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<UserStateModel>, action: DeleteUser) {
    return this.userApi.deleteUser(action.userId).subscribe(() =>
      ctx.dispatch(new FetchUsers())
    );
  }

}
