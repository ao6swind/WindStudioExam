import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { ManageRoutingModule } from './manage-routing.module';
import { NgModule } from '@angular/core';
import { PartialsModule } from './../../partials/partials.module';

@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    PartialsModule,
  ]
})
export class ManageModule { }
