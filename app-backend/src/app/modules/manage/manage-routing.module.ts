import { RouterModule, Routes } from '@angular/router';

import { LinkModule } from './link/link.module';
import { ManageComponent } from './manage.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: "",
    component: ManageComponent,
    children: [
      {
        path: "exams",
        loadChildren: () => import("./exam/exam.module").then(m => m.ExamModule)
      },
      {
        path: "links",
        loadChildren: () => import("./link/link.module").then(m => m.LinkModule)
      },
      {
        path: "tags",
        loadChildren: () => import("./tag/tag.module").then(m => m.TagModule)
      },
      {
        path: "questions",
        loadChildren: () => import("./question/question.module").then(m => m.QuestionModule)
      },
      {
        path: "",
        loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
