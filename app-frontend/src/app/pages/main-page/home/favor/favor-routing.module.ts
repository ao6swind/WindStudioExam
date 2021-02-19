import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavorPage } from './favor.page';

const routes: Routes = [
  {
    path: '',
    component: FavorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavorPageRoutingModule {}
