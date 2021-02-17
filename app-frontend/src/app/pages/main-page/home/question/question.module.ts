import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetContentViewPipe } from './../../../../pipes/get-content-view.pipe';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { QuestionPage } from './question.page';
import { QuestionPageRoutingModule } from './question-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionPageRoutingModule
  ],
  declarations: [
    QuestionPage,
    GetContentViewPipe
  ]
})
export class QuestionPageModule {}
