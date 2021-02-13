import { RouterModule, Routes } from '@angular/router';

import { ExamComponent } from './exam.component';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: "",
    component: ExamComponent,
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
export class ExamRoutingModule { }
