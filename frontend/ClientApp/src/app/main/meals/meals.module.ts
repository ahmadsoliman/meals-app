import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GridModule } from "@progress/kendo-angular-grid";
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { MealsListComponent } from "./list/list.component";
import { DetailsModalComponent } from "./details-modal/details-modal.component";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { SharedModule } from "@app/shared/shared.module";

@NgModule({
  declarations: [MealsListComponent, DetailsModalComponent],
  imports: [
    SharedModule,
    RouterModule,
    GridModule,
    DialogsModule,
    DateInputsModule
  ],
  exports: []
})
export class MealsModule {}
