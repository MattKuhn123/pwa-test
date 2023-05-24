import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SpeciesService } from './species.service';
import { Species } from './species.model';
import { StatesService } from '../states.service';

@Component({
  selector: 'app-population',
  styles: [ ],
  template: `
  <mat-card [formGroup]="formGroup">
    <mat-card-header>
      <mat-card-title>Population</mat-card-title>
      <mat-card-subtitle>Population details</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <mat-form-field formGroupName="breed" *ngIf="species.length">
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
        (click)="states.toSetPopulation()"
        [disabled]="!formGroup.valid">
        Done
      </button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class PopulationComponent implements OnInit {
  protected species: Species[] = [];
  @Input() formGroup!: FormGroup;

  protected get breedGroup(): FormGroup { return this.formGroup.get('breed') as FormGroup; }
  
  constructor(protected states: StatesService, breedSvc: SpeciesService) {
    breedSvc.getSpecies().subscribe(species => this.species = species);
  }

  ngOnInit(): void {
    // TODO : This seems like a lot of code to write
    this.breedGroup.get("id")?.valueChanges.subscribe(id => {
      this.breedGroup.get("name")?.setValue(this.species.find(b => b.id === id)?.name);
    });
  }
}
