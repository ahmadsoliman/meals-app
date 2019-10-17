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
  DeleteUser,
  FetchUser,
  UpdateUser,
  CreateUser,
  DeleteUserFromProfile,
  Logout,
  ChangeUsersPage,
  FetchMyUser
} from './user.actions';
import { UserApiService } from '@app/core/api/user-api.service';

export interface UserStateModel {
  loggedInUser: UserInfo,
  selectedUser: UserInfo,

  usersGridData: GridDataResult,
  usersLoading: boolean,
  skip: number
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    loggedInUser: UserInfo.createNew(),
    selectedUser: UserInfo.createNew(),

    usersGridData: { data: [], total: 0 },
    usersLoading: false,
    skip: 0
  }
})
export class UserState implements NgxsOnInit {
  constructor(
    private readonly auth: AuthService,
    private readonly userApi: UserApiService
  ) { }

  ngxsOnInit(ctx: StateContext<UserStateModel>) {
    if (this.auth.isAuthenticated()) {
      ctx.dispatch(new FetchMyUser());
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
      catchError((errors) => {
        return throwError(errors.errors);
      })
    );
  }

  @Action(Logout)
  logout(
    ctx: StateContext<UserStateModel>,
    action: Logout
  ) {
    this.auth.logout();
    ctx.dispatch(new Navigate(['/login']));
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
      catchError((errors) => {
        return throwError(errors.errors);
      })
    );
  }

  @Action(FetchUsers)
  fetchUsers(ctx: StateContext<UserStateModel>) {
    ctx.patchState({
      usersLoading: true
    });
    return this.userApi.getUsers(ctx.getState().skip).subscribe((usersList: UsersList) =>
      ctx.patchState({
        usersGridData: { data: usersList.users, total: usersList.total },
        usersLoading: false
      })
    );
  }

  @Action(ChangeUsersPage)
  changeUsersPage(ctx: StateContext<UserStateModel>, action: ChangeUsersPage) {
    ctx.patchState({
      skip: action.skip
    });
    return ctx.dispatch(new FetchUsers());
  }

  @Action(FetchUser)
  fetchUser(ctx: StateContext<UserStateModel>, action: FetchUser) {
    return this.userApi.getUser(action.userId).subscribe((user) =>
      ctx.patchState({
        selectedUser: user
      })
    );
  }
  
  @Action(FetchMyUser)
  fetchMyUser(ctx: StateContext<UserStateModel>, action: FetchMyUser) {
    return this.auth.userloggedIn().subscribe((user: UserInfo) => {
      ctx.patchState({
        loggedInUser: user
      });
    });
  }

  @Action(CreateUser)
  createUser(ctx: StateContext<UserStateModel>, action: CreateUser) {
    return this.userApi.createUser(action.user).subscribe(() => {
      ctx.dispatch(new Navigate(['/users']));
    });
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<UserStateModel>, action: UpdateUser) {
    return this.userApi.updateUser(action.user, action.userId).subscribe(() => {
      if(!action.userId) {
        ctx.dispatch(new FetchMyUser());
      } else {
        ctx.dispatch(new FetchUsers());
      }
    });
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<UserStateModel>, action: DeleteUser) {
    return this.userApi.deleteUser(action.userId).subscribe(() =>
      ctx.dispatch(new FetchUsers())
    );
  }

  @Action(DeleteUserFromProfile)
  deleteUserFromProfile(ctx: StateContext<UserStateModel>, action: DeleteUserFromProfile) {
    return this.userApi.deleteUser(action.userId, action.myUser).subscribe(() => {
      if (action.myUser) {
        ctx.dispatch(new Logout());
      } else {
        ctx.dispatch(new FetchUsers());
        ctx.dispatch(new Navigate(['/users']));
      }
    });
  }

}
