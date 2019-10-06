import { Component, OnInit } from '@angular/core';
import { LayoutState } from '@app/main/layout/layout.state';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  sideBarOpened$ = this.store.select(LayoutState.SideBarOpened);
  assetTreeOpened$ = this.store.select(LayoutState.AssetTreeOpened);

  constructor(private readonly store: Store) {
    this.sideBarOpened$ = this.store.select(
      (state) => state.layout.sideBarOpened
    );
    this.assetTreeOpened$ = this.store.select(
      (state) => state.layout.assetTreeOpened
    );
  }

  ngOnInit() {}
}
