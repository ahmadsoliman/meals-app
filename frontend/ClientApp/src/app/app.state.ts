import { State } from '@ngxs/store';
import { UserState, UserStateModel } from './main/user/user.state';

export interface LayoutStateModel {
  
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: {
    
  }
})
export class LayoutState {
  
}

export const appStates = [
  LayoutState,
  UserState
];
export interface AppState {
  layout: LayoutStateModel;
  user: UserStateModel;
}
