import { TestBed } from "@angular/core/testing";
import { Store, NgxsModule } from "@ngxs/store";
import "jest";
import { MealsState } from "./meals.state";
import { FetchMeals, ChangeMealsPage } from "./meals.actions";
import { AppState } from "@app/app.state";
import { GridDataResult } from "@progress/kendo-angular-grid";

import { MealsMockApiService } from "@app/core/mock_api/meals-mock-api.service";
import { MealsApiService } from "@app/core/api/meals-api.service";

describe("MealsState", () => {
  let store: Store;
  // let actions$: Observable<any>;

  function errorWrapper(done: any, body: any) {
    try {
      body();
      done();
    } catch (error) {
      done.fail(error);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgxsModule.forRoot([MealsState])],
      providers: [{ provide: MealsApiService, useClass: MealsMockApiService }]
    });
    store = TestBed.get(Store);
    // actions$ = TestBed.get(Actions);
  });

  test("FetchMeals should fetch meals list with total", done => {
    store.dispatch(new FetchMeals("userid"));
    store
      .selectOnce((state: AppState) => state.meals.mealsGridData)
      .subscribe((data: GridDataResult) => {
        errorWrapper(done, () => {
          expect(data.data).toEqual(MealsMockApiService.mealsList.slice(0, 10));
          expect(data.total).toEqual(MealsMockApiService.mealsList.length);
        });
      });
  });

  test("ChangeMealsPage should change page of meals list and fetch meals should get new page", done => {
    store.dispatch(new ChangeMealsPage(10));
    store
      .selectOnce((state: AppState) => state.meals.skip)
      .subscribe((skip: number) => {
        errorWrapper(done, () => {
          expect(skip).toEqual(10);
        });
      });
    store.dispatch(new FetchMeals("userid"));
    store
      .selectOnce((state: AppState) => state.meals.mealsGridData)
      .subscribe((data: GridDataResult) => {
        errorWrapper(done, () => {
          expect(data.data).toEqual(
            MealsMockApiService.mealsList.slice(10, 13)
          );
          expect(data.total).toEqual(MealsMockApiService.mealsList.length);
        });
      });
  });
});
