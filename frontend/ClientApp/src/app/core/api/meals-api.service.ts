import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { apiUrlsConfig } from './api.config';
import { AuthToken, Meal, MealsList, DateRange } from '../models';

@Injectable()
export class MealsApiService {
  private readonly mealsUrl = apiUrlsConfig.mealsUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  public createMeal(userId: string, meal: Meal): Observable<string> {
    return this.http
      .post<{id: string}>(this.mealsUrl.replace(':userId', userId), meal)
      .pipe(map(data => data.id))
      .pipe(catchError(this.handleError));
  }

  public getMeals(userId: string, dateRange?: DateRange, timeRange?: DateRange): Observable<MealsList> {
    if(!userId) return;
    let params = new HttpParams();
    if(dateRange) {
      if(dateRange.start) params = params.set('startDate', dateRange.start.toISOString());
      if(dateRange.end) params = params.set('endDate', dateRange.end.toISOString());
    }
    if(timeRange) {
      if(timeRange.start) params = params.append('startTime', timeRange.start.toISOString());
      if(timeRange.end) params = params.append('endTime', timeRange.end.toISOString());
    }

    return this.http
      .get<MealsList>(this.mealsUrl.replace(':userId', userId), { params })
      .pipe(map((mealsList) => {
        mealsList.meals = mealsList.meals.map(meal => {
          meal.date = new Date(meal.date);
          return meal;
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

  private handleError(error: HttpErrorResponse) {
    let message: string;
    let statusCode: number;
    if (error instanceof ErrorEvent) {
      message = error.error.message ? error.error.message : error.toString();
    } else {
      const err = error.error || JSON.stringify(error);
      statusCode = error.status;
      message = err;
    }
    return throwError(error);
  }
}
