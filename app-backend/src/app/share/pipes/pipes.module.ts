import { CommonModule } from '@angular/common';
import { EnumToArrayPipe } from './enum-to-array.pipe';
import { GetQuestionTypePipe } from './get-question-type.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    GetQuestionTypePipe,
    EnumToArrayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GetQuestionTypePipe,
    EnumToArrayPipe
  ]
})
export class PipesModule { }
