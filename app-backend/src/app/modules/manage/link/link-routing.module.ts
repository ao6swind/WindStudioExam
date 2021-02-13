import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { LinkComponent } from './link.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LinkComponent,
    children: [
      {
        path: ':pageSize/:pageNumber',
        component: IndexComponent
      },
      {
        path: '',
        redirectTo: '10/1'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkRoutingModule { }
