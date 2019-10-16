import { Meal, DateRange } from '@app/core/models';

export class FetchMeals {
  static type = '[Meal] FetchMeals';
  constructor(public userId: string) { }
}

export class SetDateRanges {
  static type = '[Meal] SetDateRanges';
  constructor(public dateRange: DateRange, public timeRange: DateRange) { }
}

export class ChangeMealsPage {
  static type = '[Meal] ChangeMealsPage';
  constructor(public skip: number) { }
}

export class FetchMeal {
  static type = '[Meal] FetchMeal';
  constructor(public userId: string, public mealId: string) { }
}

export class CreateMeal {
  static type = '[Meal] CreateMeal';
  constructor(public userId: string, public meal: Meal) { }
}

export class UpdateMeal {
  static type = '[Meal] UpdateMeal';
  constructor(public userId: string, public meal: Meal) { }
}

export class DeleteMeal {
  static type = '[Meal] DeleteMeal';
  constructor(public userId: string, public mealId: string) { }
}