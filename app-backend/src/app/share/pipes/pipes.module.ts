import { CommonModule } from '@angular/common';
import { EnumToArrayPipe } from './enum-to-array.pipe';
import { GetLinkIconPipe } from './get-link-icon.pipe';
import { GetQuestionTypePipe } from './get-question-type.pipe';
import { NgModule } from '@angular/core';
import { SafeHtmlToStringPipe } from './safe-html-to-string.pipe';

@NgModule({
  declarations: [
    GetQuestionTypePipe,
    EnumToArrayPipe,
    SafeHtmlToStringPipe,
    GetLinkIconPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GetQuestionTypePipe,
    EnumToArrayPipe,
    SafeHtmlToStringPipe,
    GetLinkIconPipe
  ]
})
export class PipesModule { }
