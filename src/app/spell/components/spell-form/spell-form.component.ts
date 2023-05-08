import { Component, Inject } from '@angular/core';
import { Spell } from '../../models/spell';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpellService } from '../../services/spell.service';

export interface SpellFormData {
  isCreateForm: boolean;
  spell: Spell;
}

@Component({
  selector: 'app-spell-form',
  templateUrl: './spell-form.component.html',
  styleUrls: ['./spell-form.component.scss']
})
export class SpellFormComponent {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  classes: string[] = [
    'EVOCATION',
    'CONJURATION',
    'INVOCATION',
    'ENCHANTEMENT',
    'ILLUSION',
    'NECROMANCIE',
    'TRANSMUTATION',
    'DIVINATION',
    'METAMORPHOSE'
  ];

  spellForm = this.fb.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    class: ['', [Validators.required]],
  });

  constructor(public dialogRef: MatDialogRef<SpellFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SpellFormData, private fb: FormBuilder, 
    private spellService : SpellService, private _snackBar: MatSnackBar) {

      if(!data.isCreateForm){
        this.setspellForm(data.spell);
      }

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setspellForm(spell: Spell) {
    this.spellForm.setValue({
      id: spell.id,
      name: spell.name,
      class: spell.class, 
    });
  }

  get title(){
    if(this.data.isCreateForm){
      return 'Formulaire de création';
    }
    return 'Formulaire de modification';
  }

  get submitBtnName(){
    if(this.data.isCreateForm){
      return 'Ajouter';
    }
    return 'Modifier';
  }

  onSubmit(){
    if(this.spellForm.valid){
      if(this.data.isCreateForm){
        this.spellForm.value.id = Date.now() + Math.random();
        this.spellService.create(this.spellForm.value as Spell)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });

          this.dialogRef.close(true);
        });
      }else{
        this.spellService.update(this.spellForm.value as Spell)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });
          this.dialogRef.close(true);
        });
      }
    }
  }
}
