import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from 'app-backend/src/app/share/share.module';
import { TagComponent } from './tag.component';
import { TagRoutingModule } from './tag-routing.module';

@NgModule({
  declarations: [
    TagComponent
  ],
  imports: [
    CommonModule,
    TagRoutingModule,
    ShareModule
  ]
})
export class TagModule { }
