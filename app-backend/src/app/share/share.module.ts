import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule
  ],
  exports: [
    ComponentsModule,
    PipesModule
  ]
})
export class ShareModule { }
