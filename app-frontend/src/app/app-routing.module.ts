import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module')
      .then(m => m.TutorialPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/main-page/main-page.module').then( m => m.MainPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
