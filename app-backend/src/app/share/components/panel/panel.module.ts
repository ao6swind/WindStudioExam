import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { PanelGroupComponent } from './panel-group.component';

@NgModule({
  declarations: [
    PanelComponent,
    PanelGroupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PanelComponent,
    PanelGroupComponent
  ]
})
export class PanelModule { }
