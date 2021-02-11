import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { RouterModule } from '@angular/router';
import { TooltipModule } from './../../directives/tooltip/tooltip.module';

@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TooltipModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
