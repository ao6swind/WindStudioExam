import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PipesModule } from 'app-frontend/src/app/pipes/pipes.module';
import { ReviewPage } from './review.page';
import { ReviewPageRoutingModule } from './review-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewPageRoutingModule,
    PipesModule
  ],
  declarations: [ReviewPage]
})
export class ReviewPageModule {}
