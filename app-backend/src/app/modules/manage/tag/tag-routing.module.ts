import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { TagComponent } from './tag.component';

const routes: Routes = [
  {
    path: '',
    component: TagComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
