import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpellService } from '../../services/spell.service';
import { Observable } from 'rxjs';
import { Spell } from '../../models/spell';
import {Location} from '@angular/common';

@Component({
  selector: 'app-spell-details',
  templateUrl: './spell-details.component.html',
  styleUrls: ['./spell-details.component.scss']
})
export class SpellDetailsComponent {
  spellID: number;
  spell$: Observable<Spell>;

  constructor(private route: ActivatedRoute, private spellService: SpellService, private location: Location){
  /* route.params.subscribe(params => {
      this.spellId = params['id'];
    });*/

    this.spellID = +this.route.snapshot.paramMap.get('id') ;
  }
  ngOnInit(): void{
    if(this.spellID){
      this.spell$ = this.spellService.getById(this.spellID);
    }
  }

  goBack(){
    this.location.back();
  }

  showReceivedValue(value:boolean){
    console.log(value);
  }

}
