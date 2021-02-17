import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PipesModule } from './../../../../pipes/pipes.module';
import { QuestionPage } from './question.page';
import { QuestionPageRoutingModule } from './question-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionPageRoutingModule,
    PipesModule
  ],
  declarations: [
    QuestionPage
  ]
})
export class QuestionPageModule {}
