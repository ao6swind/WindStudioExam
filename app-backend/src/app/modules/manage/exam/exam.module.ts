import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam.component';
import { ExamRoutingModule } from './exam-routing.module';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { ShareModule } from 'app-backend/src/app/share/share.module';

@NgModule({
  declarations: [
    ExamComponent,
    IndexComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    ShareModule,
    FormsModule
  ]
})
export class ExamModule { }
