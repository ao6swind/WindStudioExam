import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'exam',
        loadChildren: () => import('./exam/exam.module').then( m => m.ExamPageModule)
      },
      {
        path: 'question',
        loadChildren: () => import('./question/question.module').then( m => m.QuestionPageModule)
      },
      {
        path: 'filter',
        loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
      },
      {
        path: 'favor',
        loadChildren: () => import('./favor/favor.module').then( m => m.FavorPageModule)
      },
      {
        path: 'review/:id',
        loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
      },
      {
        path: '',
        redirectTo: 'exam'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
