import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form/form.component';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { QuestionComponent } from './question.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionComponent,
    children: [
      {
        path: 'edit/:id',
        component: FormComponent
      },
      {
        path: 'create',
        component: FormComponent
      },
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
export class QuestionRoutingModule { }
