import { CommonModule } from '@angular/common';
import { GetContentViewPipe } from './get-content-view.pipe';
import { GetIonicIconPipe } from './get-ionic-icon.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    GetContentViewPipe,
    GetIonicIconPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GetContentViewPipe,
    GetIonicIconPipe
  ]
})
export class PipesModule { }
