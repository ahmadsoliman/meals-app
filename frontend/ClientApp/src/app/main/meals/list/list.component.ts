import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GridDataResult, RowClassArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { AppState } from '@app/app.state';
import { Observable } from 'rxjs';
import { UserInfo, Meal, DateRange } from '@app/core/models';
import { FetchMeals, DeleteMeal, SetDateRanges, ChangeMealsPage } from '../meals.actions';
import { ActivatedRoute } from '@angular/router';
import { FetchUser } from '@app/main/user/user.actions';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-meals-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
      .k-grid tr.valid { background-color: #bde1a8 }
      .k-grid tr.invalid { background-color: rgba(229, 71, 75, 0.7); }
  `]
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
  
  @Select((state: AppState) => state.meals.skip) skip$!: Observable<number>;
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
    this.route.params.pipe(first()).subscribe(params => {
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

  public rowCallback(context: RowClassArgs) {
    return {
      valid: !context.dataItem.exceedsDailyLimit,
      invalid: context.dataItem.exceedsDailyLimit
    };
  }

  public changePage({ skip }: PageChangeEvent) {
    this.store.dispatch(new ChangeMealsPage(skip));
    this.store.dispatch(new FetchMeals(this.userId));
  }
}
