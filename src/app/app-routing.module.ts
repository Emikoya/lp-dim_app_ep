import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'spells',
    pathMatch: 'full'
  },
  {
    path: 'spells',
    loadChildren: () => import('./spell/spell.module').then(m => m.SpellModule)
  },
  {
    path : "**",
    component : NotFoundComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
