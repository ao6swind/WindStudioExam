import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { CommonModule } from '@angular/common';
import { ConfirmModule } from './confirm/confirm.module';
import { DrawerModule } from './drawer/drawer.module';
import { NgModule } from '@angular/core';
import { PaginationModule } from './pagination/pagination.module';
import { PanelModule } from './panel/panel.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    ConfirmModule,
    PaginationModule,
    PanelModule,
    DrawerModule,
  ],
  exports: [
    BreadcrumbModule,
    ConfirmModule,
    PaginationModule,
    PanelModule,
    DrawerModule
  ]
})
export class ComponentsModule { }
