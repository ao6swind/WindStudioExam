import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { NgModule } from '@angular/core';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ]
})
export class ShareModule { }
