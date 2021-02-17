import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainPagePage } from './main-page.page';
import { MainPagePageRoutingModule } from './main-page-routing.module';
import { NgModule } from '@angular/core';
import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPagePageRoutingModule,
    PipesModule
  ],
  declarations: [
    MainPagePage
  ]
})
export class MainPagePageModule {}
