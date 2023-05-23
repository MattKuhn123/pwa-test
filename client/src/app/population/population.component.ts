import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BreedService } from './breed.service';
import { Breed } from './breed.model';
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
      <mat-form-field formGroupName="breed" *ngIf="breeds.length">
        <mat-label>Breed</mat-label>
        <mat-select formControlName="id">
          <mat-option *ngFor="let breed of breeds" [value]="breed.id">
            {{ breed.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <p *ngIf="!breeds.length">please wait...</p>

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
  protected breeds: Breed[] = [];
  @Input() formGroup!: FormGroup;

  protected get breedGroup(): FormGroup { return this.formGroup.get('breed') as FormGroup; }
  
  constructor(protected states: StatesService, breedSvc: BreedService) {
    breedSvc.getBreeds().subscribe(breeds => this.breeds = breeds);
  }

  ngOnInit(): void {
    // TODO : This seems like a lot of code to write
    this.breedGroup.get("id")?.valueChanges.subscribe(id => {
      this.breedGroup.get("name")?.setValue(this.breeds.find(b => b.id === id)?.name);
    });
  }
}
