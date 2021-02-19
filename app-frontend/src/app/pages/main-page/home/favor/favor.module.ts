import { CommonModule } from '@angular/common';
import { FavorPage } from './favor.page';
import { FavorPageRoutingModule } from './favor-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PipesModule } from 'app-frontend/src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavorPageRoutingModule,
    PipesModule
  ],
  declarations: [
    FavorPage
  ]
})
export class FavorPageModule {}
