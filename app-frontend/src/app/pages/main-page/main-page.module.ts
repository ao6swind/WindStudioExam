import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetIonicIconPipe } from './../../pipes/get-ionic-icon.pipe';
import { IonicModule } from '@ionic/angular';
import { MainPagePage } from './main-page.page';
import { MainPagePageRoutingModule } from './main-page-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPagePageRoutingModule
  ],
  declarations: [
    MainPagePage,
    GetIonicIconPipe
  ]
})
export class MainPagePageModule {}
