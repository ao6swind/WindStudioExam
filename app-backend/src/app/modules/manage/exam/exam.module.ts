import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam.component';
import { ExamRoutingModule } from './exam-routing.module';
import { NgModule } from '@angular/core';
import { ShareModule } from 'app-backend/src/app/share/share.module';

@NgModule({
  declarations: [
    ExamComponent
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    ShareModule
  ]
})
export class ExamModule { }
