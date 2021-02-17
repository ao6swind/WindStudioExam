import { CommonModule } from '@angular/common';
import { FilterPage } from './filter.page';
import { FilterPageRoutingModule } from './filter-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PipesModule } from './../../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterPageRoutingModule,
    PipesModule
  ],
  declarations: [
    FilterPage
  ]
})
export class FilterPageModule {}
