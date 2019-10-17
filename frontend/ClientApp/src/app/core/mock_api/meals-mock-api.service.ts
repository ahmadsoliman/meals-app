import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Meal, MealsList, DateRange } from "../models";
import { of } from "rxjs";

@Injectable()
export class MealsMockApiService {
  public static mealsList = [
    new Meal("1", "Meal 1", new Date(), 500, false),
    new Meal("2", "Meal 2", new Date(), 500, false),
    new Meal("3", "Meal 3", new Date(), 500, false),
    new Meal("4", "Meal 4", new Date(), 500, false),
    new Meal("5", "Meal 5", new Date(), 500, false),
    new Meal("6", "Meal 6", new Date(), 500, false),
    new Meal("7", "Meal 7", new Date(), 500, false),
    new Meal("8", "Meal 8", new Date(), 500, false),
    new Meal("9", "Meal 9", new Date(), 500, false),
    new Meal("10", "Meal 10", new Date(), 500, false),
    new Meal("11", "Meal 11", new Date(), 500, false),
    new Meal("12", "Meal 12", new Date(), 500, false),
    new Meal("13", "Meal 13", new Date(), 500, false)
  ];

  // public createMeal(userId: string, meal: Meal): Observable<string> {

  // }

  public getMeals(
    userId: string,
    dateRange?: DateRange,
    timeRange?: DateRange,
    skip = 0
  ): Observable<MealsList> {
    return of(
      new MealsList(
        MealsMockApiService.mealsList.slice(skip, skip + 10),
        MealsMockApiService.mealsList.length
      )
    );
  }

  // public updateMeal(userId: string, meal: Meal): Observable<object> {
  // }

  // public deleteMeal(userId: string, mealId: string): Observable<object> {
  // }
}
