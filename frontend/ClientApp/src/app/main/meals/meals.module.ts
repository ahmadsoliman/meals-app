import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule, SharedModule } from '@progress/kendo-angular-dialog';
import { MealsListComponent } from './list/list.component';

@NgModule({
  declarations: [
    MealsListComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    GridModule,
    DialogsModule
  ],
  exports: []
})
export class MealsModule {}
