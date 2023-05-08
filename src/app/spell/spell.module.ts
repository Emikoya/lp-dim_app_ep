import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpellRoutingModule } from './spell-routing.module';
import { SpellComponent } from './spell.component';
import { SharedModule } from '../shared/shared.module';
import { SpellListComponent } from './pages/spell-list/spell-list.component';
import { SpellService } from './services/spell.service';
import { SpellFormComponent } from './components/spell-form/spell-form.component';
import { SpellDetailsComponent } from './pages/spell-details/spell-details.component';
import { SpellCardComponent } from './components/spell-card/spell-card.component';


@NgModule({
  declarations: [
    SpellComponent,
    SpellListComponent,
    SpellFormComponent,
    SpellDetailsComponent,
    SpellCardComponent
  ],
  providers: [
    SpellService
  ],
  imports: [
    CommonModule,
    SpellRoutingModule,
    SharedModule
  ]
})
export class SpellModule { }
