import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SpeciesService } from './species.service';
import { Species } from './species.model';
import { StatesService } from '../states.service';

@Component({
  selector: 'app-population',
  styles: [ ],
  template: `
  <mat-card [formGroup]="populationGroup">
    <mat-card-content>
      <mat-form-field formGroupName="species" *ngIf="species.length">
        <mat-label>Species</mat-label>
        <mat-select formControlName="id">
          <mat-option *ngFor="let spec of species" [value]="spec.id">
            {{ spec.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <p *ngIf="!species.length">please wait...</p>

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
  protected species: Species[] = [];

  protected get speciesGroup(): FormGroup { return this.populationGroup.get('species') as FormGroup; }
  
  constructor(protected states: StatesService, speciesSvc: SpeciesService) {
    speciesSvc.getSpecies().subscribe(species => this.species = species);
  }

  ngOnInit(): void {
    this.speciesGroup.get("id")?.valueChanges.subscribe(id => {
      this.speciesGroup.get("name")?.setValue(this.species.find(b => b.id === id)?.name);
    });
  }
}
