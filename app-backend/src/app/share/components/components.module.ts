import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { CommonModule } from '@angular/common';
import { ConfirmModule } from './confirm/confirm.module';
import { DrawerModule } from './drawer/drawer.module';
import { NgModule } from '@angular/core';
import { PanelModule } from './panel/panel.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    ConfirmModule,
    PanelModule,
    DrawerModule,
  ],
  exports: [
    BreadcrumbModule,
    ConfirmModule,
    PanelModule,
    DrawerModule
  ]
})
export class ComponentsModule { }
