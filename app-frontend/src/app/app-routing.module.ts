import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ReadTutorialGuard } from './guards/read-tutorial.guard';

const routes: Routes = [
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module')
      .then(m => m.TutorialPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/main-page/main-page.module')
      .then( m => m.MainPagePageModule),
    canLoad: [ ReadTutorialGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
