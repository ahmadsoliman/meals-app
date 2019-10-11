import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { FetchUsers } from '../user.actions';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AppState } from '@app/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html'
})
export class UserListComponent implements OnInit {

  @Select((state: AppState) => state.user.usersGridData) usersGridData$!: Observable<GridDataResult>;
  @Select((state: AppState) => state.user.usersLoading) usersLoading$!: Observable<boolean>;
  
  constructor(
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(new FetchUsers());
  }

}
