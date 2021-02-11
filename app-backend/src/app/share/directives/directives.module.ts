import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipModule } from './tooltip/tooltip.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TooltipModule
  ],
  exports: [
    TooltipModule
  ]
})
export class DirectivesModule { }
