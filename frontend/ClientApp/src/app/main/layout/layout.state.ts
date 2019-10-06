import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ToggleAssetTree, ToggleSideBar } from './layout.actions';

export interface LayoutStateModel {
  sideBarOpened: boolean;
  assetTreeOpened: boolean;
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: {
    sideBarOpened: true,
    assetTreeOpened: false
  }
})
export class LayoutState {

  constructor() { }

  @Selector()
  static SideBarOpened(state: LayoutStateModel) {
    return state.sideBarOpened;
  }

  @Selector()
  static AssetTreeOpened(state: LayoutStateModel) {
    return state.assetTreeOpened;
  }

  @Action(ToggleSideBar)
  ToggleSideBar(ctx: StateContext<LayoutStateModel>, action: ToggleSideBar) {
    const state = ctx.getState();
    const sideBarOpened = !state.sideBarOpened;
    const assetTreeOpened = state.assetTreeOpened
      ? false
      : state.assetTreeOpened;
    ctx.patchState({
      sideBarOpened,
      assetTreeOpened
    });
  }
  @Action(ToggleAssetTree)
  ToggleAssetTree(
    ctx: StateContext<LayoutStateModel>,
    action: ToggleAssetTree
  ) {
    const state = ctx.getState();
    const assetTreeOpened = !state.assetTreeOpened;
    const sideBarOpened = state.sideBarOpened ? false : state.sideBarOpened;
    ctx.patchState({
      assetTreeOpened,
      sideBarOpened
    });
  }
}
