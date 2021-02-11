import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ConfirmComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConfirmComponent
  ]
})
export class ConfirmModule { }
