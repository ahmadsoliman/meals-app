import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { FetchUsers, DeleteUser, ChangeUsersPage } from '../user.actions';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { AppState } from '@app/app.state';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/auth';
import { UserInfo, permissionLevels } from '@app/core/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html'
})
export class UserListComponent implements OnInit {

  public permissionLevels = permissionLevels;
  public deleteDialogOpened = false;
  public userBeingDeleted: UserInfo;

  @Select((state: AppState) => state.user.skip) skip$!: Observable<number>;
  @Select((state: AppState) => state.user.usersGridData) usersGridData$!: Observable<GridDataResult>;
  @Select((state: AppState) => state.user.usersLoading) usersLoading$!: Observable<boolean>;
  
  constructor(
    private readonly store: Store,
    private readonly auth: AuthService
  ) {}

  ngOnInit() {
    this.store.dispatch(new FetchUsers());
  }

  public closeDeleteDialog() {
    this.deleteDialogOpened = false;
  }

  public openDeleteDialog(user: UserInfo) {
    this.userBeingDeleted = user;
    this.deleteDialogOpened = true;
  }

  public deleteUser() {
    this.store.dispatch(new DeleteUser(this.userBeingDeleted.id))
    this.deleteDialogOpened = false;
  }
  
  public changePage({ skip }: PageChangeEvent) {
    this.store.dispatch(new ChangeUsersPage(skip));
  }
}
