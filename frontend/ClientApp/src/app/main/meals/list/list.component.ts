import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AppState } from '@app/app.state';
import { Observable } from 'rxjs';
import { UserInfo, Meal, DateRange } from '@app/core/models';
import { FetchMeals, DeleteMeal, SetDateRanges } from '../meals.actions';
import { ActivatedRoute } from '@angular/router';
import { FetchUser } from '@app/main/user/user.actions';

@Component({
  selector: 'app-meals-list',
  templateUrl: './list.component.html'
})
export class MealsListComponent implements OnInit {

  public isForCurrentUser = false;
  public userId: string;
  public deleteDialogOpened = false;
  public mealBeingDeleted: Meal;

  public dateRangeFilter = new DateRange(null, null);
  public timeRangeFilter = new DateRange(null, null);

  @Select((state: AppState) => state.user.selectedUser) user$!: Observable<UserInfo>;
  @Select((state: AppState) => state.user.loggedInUser) loggedInUser$!: Observable<UserInfo>;

  @Select((state: AppState) => state.meals.mealsGridData) mealsGridData$!: Observable<GridDataResult>;
  @Select((state: AppState) => state.meals.mealsLoading) mealsLoading$!: Observable<boolean>;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {
  }

  resetRanges() {
    this.dateRangeFilter.start = null;
    this.dateRangeFilter.end = null;
    this.timeRangeFilter.start = null;
    this.timeRangeFilter.end = null;
    this.search();
  }

  search() {
    this.store.dispatch(new SetDateRanges(this.dateRangeFilter, this.timeRangeFilter));
    this.store.dispatch(new FetchMeals(this.userId));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['userId']) {
        this.isForCurrentUser = false;
        this.userId = params['userId'];
        this.store.dispatch(new FetchUser(this.userId));
        this.search();
      } else {
        this.isForCurrentUser = true;
        this.loggedInUser$.subscribe(user => {
          if (user.id.length) {
            this.userId = user.id;
          }
          this.search();
        });
      }
    });
  }

  public closeDeleteDialog() {
    this.deleteDialogOpened = false;
  }

  public openDeleteDialog(meal: Meal) {
    this.mealBeingDeleted = meal;
    this.deleteDialogOpened = true;
  }

  public deleteMeal() {
    this.store.dispatch(new DeleteMeal(this.userId, this.mealBeingDeleted.id))
    this.deleteDialogOpened = false;
  }
}
