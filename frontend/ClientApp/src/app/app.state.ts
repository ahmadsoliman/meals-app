import { State } from '@ngxs/store';

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
  LayoutState
];
export interface AppState {
  layout: LayoutStateModel;
}
