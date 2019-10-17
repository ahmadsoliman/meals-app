export class Meal {
  public constructor(
    public id: string,
    public text: string,
    public date: Date,
    public calories: number,
    public exceedsDailyLimit = false
  ) {}
  public static createNew(): Meal {
    return new Meal("", "", new Date(), 0);
  }
}

export class MealsList {
  public constructor(public meals: Meal[], public total: number) {}
}

export class DateRange {
  public constructor(public start: Date | null, public end: Date | null) {}
  public static createNew(): DateRange {
    return new DateRange(new Date(), new Date());
  }
}
