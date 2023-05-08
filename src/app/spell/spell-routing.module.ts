import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpellComponent } from './spell.component';

const routes: Routes = [
  {
    path: '',
    component: SpellComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpellRoutingModule { }
