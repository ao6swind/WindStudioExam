import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    DrawerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DrawerComponent
  ]
})
export class DrawerModule { }
