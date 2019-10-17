import {
  Action,
  State,
  StateContext
} from '@ngxs/store';

import { MealsList, DateRange } from '@app/core/models';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { MealsApiService } from '@app/core/api/meals-api.service';
import { FetchMeals, UpdateMeal, DeleteMeal, CreateMeal, SetDateRanges, ChangeMealsPage } from './meals.actions';

export interface MealsStateModel {
  mealsGridData: GridDataResult,
  mealsLoading: boolean,
  skip: number,

  dateRange: DateRange | undefined,
  timeRange: DateRange | undefined
}

@State<MealsStateModel>({
  name: 'meals',
  defaults: {
    mealsGridData: { data: [], total: 0 },
    mealsLoading: false,
    skip: 0,

    dateRange: undefined,
    timeRange: undefined
  }
})
export class MealsState {
  constructor(
    private readonly mealsApi: MealsApiService
  ) { }


  @Action(FetchMeals)
  fetchMeals(ctx: StateContext<MealsStateModel>, action: FetchMeals) {
    if (!action.userId) {
      return;
    }
    const state = ctx.getState();
    ctx.patchState({
      mealsLoading: true
    });
    return this.mealsApi.getMeals(action.userId, state.dateRange, state.timeRange, state.skip)
      .subscribe((mealsList: MealsList) =>
        ctx.patchState({
          mealsGridData: { data: mealsList.meals, total: mealsList.total },
          mealsLoading: false
        })
      );
  }

  @Action(SetDateRanges)
  setDateRanges(ctx: StateContext<MealsStateModel>, action: SetDateRanges) {
    ctx.patchState({
      dateRange: { ...action.dateRange },
      timeRange: { ...action.timeRange },
      skip: 0
    });
  }

  @Action(ChangeMealsPage)
  changeMealsPage(ctx: StateContext<MealsStateModel>, action: ChangeMealsPage) {
    ctx.patchState({
      skip: action.skip
    });
  }

  @Action(CreateMeal)
  createMeal(ctx: StateContext<MealsStateModel>, action: CreateMeal) {
    return this.mealsApi.createMeal(action.userId, action.meal).subscribe(() =>
      ctx.dispatch(new FetchMeals(action.userId))
    );
  }

  @Action(UpdateMeal)
  updateMeal(ctx: StateContext<MealsStateModel>, action: UpdateMeal) {
    return this.mealsApi.updateMeal(action.userId, action.meal).subscribe(() =>
      ctx.dispatch(new FetchMeals(action.userId))
    );
  }

  @Action(DeleteMeal)
  deleteMeal(ctx: StateContext<MealsStateModel>, action: DeleteMeal) {
    return this.mealsApi.deleteMeal(action.userId, action.mealId).subscribe(() =>
      ctx.dispatch(new FetchMeals(action.userId))
    );
  }

}
