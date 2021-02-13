import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { LinkComponent } from './link.component';
import { LinkRoutingModule } from './link-routing.module';
import { NgModule } from '@angular/core';
import { ShareModule } from 'app-backend/src/app/share/share.module';

@NgModule({
  declarations: [
    LinkComponent,
    IndexComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    LinkRoutingModule,
    ShareModule,
    FormsModule
  ]
})
export class LinkModule { }
