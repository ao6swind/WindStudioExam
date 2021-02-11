import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./modules/login/login.module")
      .then(m => m.LoginModule)
  },
  {
    path: "",
    loadChildren: () => import("./modules/manage/manage.module")
      .then(m => m.ManageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
