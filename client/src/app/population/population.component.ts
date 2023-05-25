import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Species } from './species.model';
import { FormGroupService } from '../form-group.service';

@Component({
  selector: 'app-population',
  styles: [ ],
  template: `
  <mat-card [formGroup]="formGroupService.getPopulationGroup(sIdx)">
    <mat-card-content>
      <mat-form-field formGroupName="species" *ngIf="species">
        <mat-label>Species</mat-label>
        <mat-select formControlName="id">
          <mat-option *ngFor="let spec of species" [value]="spec.id">
            {{ spec.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <p *ngIf="!species">please wait...</p>

      <mat-form-field>
        <mat-label>Count</mat-label>
        <input type="number" formControlName="count" matInput>
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions>
      <button
        mat-button
        (click)="done.emit()"
      >Done</button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class PopulationComponent implements OnInit {
  @Output() done: EventEmitter<void> = new EventEmitter<void>();
  @Input() sIdx!: number;
  @Input() species!: Species[];

  constructor(protected formGroupService: FormGroupService) { }

  ngOnInit(): void {
    this.formGroupService.getSpeciesGroup(this.sIdx).get("id")?.valueChanges.subscribe(id => {
      this.formGroupService.getSpeciesGroup(this.sIdx).get("name")?.setValue(this.species.find(b => b.id === id)?.name);
    });
  }
}
