import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { apiUrlsConfig } from './api.config';
import { Meal, MealsList, DateRange } from '../models';

@Injectable()
export class MealsApiService {
  private readonly mealsUrl = apiUrlsConfig.mealsUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  public createMeal(userId: string, meal: Meal): Observable<string> {
    return this.http
      .post<{ id: string }>(this.mealsUrl.replace(':userId', userId), meal)
      .pipe(map(data => data.id))
      .pipe(catchError(this.handleError));
  }

  public getMeals(userId: string, dateRange?: DateRange, timeRange?: DateRange, skip = 0): Observable<MealsList> {
    let params = MealsApiService.setMealsParams(dateRange, timeRange, skip);
    return this.http
      .get<MealsList>(this.mealsUrl.replace(':userId', userId), { params })
      .pipe(map((mealsList) => {
        mealsList.meals = mealsList.meals.map(meal => {
          meal.date = new Date(meal.date);
          return meal;
        });
        mealsList.meals = mealsList.meals.sort((a,b) => {
          if(a.date < b.date) {
            return -1;
          } else {
            return 1;
          }
        });
        return mealsList;
      }))
      .pipe(catchError(this.handleError));
  }

  public updateMeal(userId: string, meal: Meal): Observable<Object> {
    return this.http
      .patch(this.mealsUrl.replace(':userId', userId) + '/' + meal.id, meal)
      .pipe(catchError(this.handleError));
  }

  public deleteMeal(userId: string, mealId: string): Observable<Object> {
    return this.http
      .delete(this.mealsUrl.replace(':userId', userId) + '/' + mealId)
      .pipe(catchError(this.handleError));
  }

  private static setMealsParams(dateRange?: DateRange, timeRange?: DateRange, skip = 0) {
    let params = new HttpParams();
    if (dateRange) {
      if (dateRange.start) params = params.set('startDate', dateRange.start.toLocaleDateString());
      if (dateRange.end) params = params.set('endDate', dateRange.end.toLocaleDateString());
    }
    if (timeRange) {
      if (timeRange.start) params = params.append('startTime', timeRange.start.toISOString());
      if (timeRange.end) params = params.append('endTime', timeRange.end.toISOString());
    }
    if (skip) {
      params = params.append('skip', '' + skip);
    }
    return params;
  }

  private handleError(error: HttpErrorResponse) {
    let message: string;
    // let statusCode: number;
    if (error instanceof ErrorEvent) {
      message = error.error.message ? error.error.message : error.toString();
    } else {
      const err = error.error || JSON.stringify(error);
      // statusCode = error.status;
      message = err;
    }
    console.error(message);
    return throwError(error);
  }
}
