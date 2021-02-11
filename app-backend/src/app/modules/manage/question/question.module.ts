import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { QuestionComponent } from './question.component';
import { QuestionRoutingModule } from './question-routing.module';
import { ShareModule } from 'app-backend/src/app/share/share.module';
import { TagComponent } from './tag/tag.component';

@NgModule({
  declarations: [
    QuestionComponent,
    FormComponent,
    IndexComponent,
    TagComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    ShareModule,
    FormsModule,
    CKEditorModule
  ]
})
export class QuestionModule { }
