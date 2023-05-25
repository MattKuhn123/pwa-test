import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Species } from './species.model';

@Component({
  selector: 'app-population',
  styles: [ ],
  template: `
  <mat-card [formGroup]="populationGroup">
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
  @Input() populationGroup!: FormGroup;
  @Input() species!: Species[];

  protected get speciesGroup(): FormGroup { return this.populationGroup.get('species') as FormGroup; }

  ngOnInit(): void {
    this.speciesGroup.get("id")?.valueChanges.subscribe(id => {
      this.speciesGroup.get("name")?.setValue(this.species.find(b => b.id === id)?.name);
    });
  }
}
