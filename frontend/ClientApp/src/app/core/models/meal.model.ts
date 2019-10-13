export class Meal {
  private constructor(
    public id: string,
    public text: string,
    public date: Date,
    public calories: Number
  ) {}
  public static createNew(): Meal {
    return new Meal('', '', new Date(), 0);
  }
}

export class MealsList {
  public constructor(
    public meals: Meal[],
    public total: number
  ) {}
}
