import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { MealsListComponent } from './list/list.component';
import { DetailsModalComponent } from './details-modal/details-modal.component';
import { DateTimePickerModule } from '@progress/kendo-angular-dateinputs';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    MealsListComponent,
    DetailsModalComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    GridModule,
    DialogsModule,
    DateTimePickerModule
  ],
  exports: []
})
export class MealsModule {}
