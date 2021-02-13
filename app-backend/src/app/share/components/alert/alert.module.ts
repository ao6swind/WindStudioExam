import { AlertComponent } from './alert.component';
import { AlertContainerComponent } from './alert-container.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AlertContainerComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertContainerComponent,
    AlertComponent,
  ]
})
export class AlertModule { }
