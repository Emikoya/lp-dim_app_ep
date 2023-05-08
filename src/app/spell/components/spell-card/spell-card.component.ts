import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Spell } from '../../models/spell';

@Component({
  selector: 'app-spell-card',
  templateUrl: './spell-card.component.html',
  styleUrls: ['./spell-card.component.scss']
})
export class SpellCardComponent {
  @Input() selectedSpell: Spell;
  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    if(this.selectedSpell){
      this.received.emit(true);
    }
  }
}
