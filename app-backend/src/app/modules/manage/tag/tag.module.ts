import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { ShareModule } from 'app-backend/src/app/share/share.module';
import { TagComponent } from './tag.component';
import { TagRoutingModule } from './tag-routing.module';

@NgModule({
  declarations: [
    TagComponent,
    IndexComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    TagRoutingModule,
    ShareModule,
    FormsModule
  ]
})
export class TagModule { }
