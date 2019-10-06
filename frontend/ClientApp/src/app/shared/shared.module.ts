import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmptyComponent } from './components/empty/empty.component';
import { NF404Component } from './components/404/404.component';

@NgModule({
  declarations: [
    EmptyComponent,
    NF404Component
  ],
  imports: [
    RouterModule.forChild([]),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    CommonModule,
    EmptyComponent,
    FormsModule,
    ReactiveFormsModule,
    EmptyComponent
  ],
  providers: [DatePipe]
})
export class SharedModule {}
