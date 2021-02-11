import { RouterModule, Routes } from '@angular/router';

import { MainPagePage } from './main-page.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MainPagePage,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPagePageRoutingModule {}
