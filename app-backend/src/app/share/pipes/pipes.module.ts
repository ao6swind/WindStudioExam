import { CommonModule } from '@angular/common';
import { EnumToArrayPipe } from './enum-to-array.pipe';
import { GetBootstrapIconPipe } from './get-bootstrap-icon.pipe';
import { GetLinkIconPipe } from './get-link-icon.pipe';
import { GetQuestionTypePipe } from './get-question-type.pipe';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeHtmlToStringPipe } from './safe-html-to-string.pipe';

@NgModule({
  declarations: [
    GetQuestionTypePipe,
    EnumToArrayPipe,
    SafeHtmlToStringPipe,
    GetLinkIconPipe,
    GetBootstrapIconPipe,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GetQuestionTypePipe,
    EnumToArrayPipe,
    SafeHtmlToStringPipe,
    GetLinkIconPipe,
    GetBootstrapIconPipe,
    SafeHtmlPipe
  ]
})
export class PipesModule { }
