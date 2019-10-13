import {
  Action,
  State,
  StateContext
} from '@ngxs/store';

import { MealsList } from '@app/core/models';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { MealsApiService } from '@app/core/api/meals-api.service';
import { FetchMeals, UpdateMeal, DeleteMeal } from './meals.actions';

export interface MealsStateModel {
  mealsGridData: GridDataResult,
  mealsLoading: boolean
}

@State<MealsStateModel>({
  name: 'meals',
  defaults: {
    mealsGridData: { data: [], total: 0 },
    mealsLoading: false
  }
})
export class MealsState {
  constructor(
    private readonly mealsApi: MealsApiService
  ) { }

  @Action(FetchMeals)
  fetchMeals(ctx: StateContext<MealsStateModel>, action: FetchMeals) {
    ctx.patchState({
      mealsLoading: true
    });
    return this.mealsApi.getMeals(action.userId).subscribe((mealsList: MealsList) =>
      ctx.patchState({
        mealsGridData: { data: mealsList.meals, total: mealsList.total },
        mealsLoading: false
      })
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
