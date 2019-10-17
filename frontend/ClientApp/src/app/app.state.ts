import { State } from "@ngxs/store";
import { UserState, UserStateModel } from "./main/user/user.state";
import { MealsState, MealsStateModel } from "./main/meals/meals.state";

export interface LayoutStateModel {
  sideBarOpened: boolean;
}

@State<LayoutStateModel>({
  name: "layout",
  defaults: {
    sideBarOpened: false
  }
})
export class LayoutState {}

export const appStates = [LayoutState, UserState, MealsState];
export interface AppState {
  layout: LayoutStateModel;
  user: UserStateModel;
  meals: MealsStateModel;
}
