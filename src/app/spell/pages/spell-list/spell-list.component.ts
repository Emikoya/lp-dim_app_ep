import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { SpellFormComponent } from '../../components/spell-form/spell-form.component';
import { Spell } from '../../models/spell';
import { SpellService } from '../../services/spell.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.scss']
})
export class SpellListComponent implements OnInit, OnDestroy {
  spells$: Observable<Spell[]>;
  displayedColumns: string[] = ['name', 'class', 'update', 'delete'];
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private spellService: SpellService, private dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router){
  }

  ngOnInit(): void {
    this.spells$ = this.spellService.get();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  
  fetchData() {
    this.spells$ = this.spellService.get();
  }

  openSpellForm(spell?: Spell) {
    const dialogRef = this.dialog.open(SpellFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: spell ? false : true,
        Spell: spell ? spell : undefined
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.fetchData();
        }
      });
  }

  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'êtes-vous sûr de vouloir supprimer ce sort ?',
        typeMessage: 'none',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Oui',
        noButtonLabel: 'Non',
      },
    })

    ref.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.spellService.delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success']
              });
              this.fetchData();
            });
        }
      });
  }

  showSpellDetails(spellID:number){
    this.router.navigate(['/spells/' + spellID]);
  }

  }