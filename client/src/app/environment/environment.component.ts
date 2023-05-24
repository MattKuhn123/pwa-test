import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HabitatService } from './habitat.service';
import { Habitat } from './habitat.model';
import { StatesService } from '../states.service';

@Component({
  selector: 'app-environment',
  styles: [
    'mat-card-content { display: flex; flex-direction: column  }'
  ],
  template: `
  <mat-card [formGroup]="formGroup">
    <mat-card-header>
      <mat-card-title>Environment</mat-card-title>
      <mat-card-subtitle>Environment details</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <mat-form-field formGroupName="habitat" *ngIf="habitats.length">
        <mat-label>Habitat</mat-label>
        <mat-select formControlName="id">
          <mat-option *ngFor="let habitat of habitats" [value]="habitat.id">
            {{ habitat.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <p *ngIf="!habitats.length">please wait...</p>

      <mat-form-field>
        <mat-label>Leader</mat-label>
        <input formControlName="leader" matInput>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Choose a date</mat-label>
        <input formControlName="date" matInput [matDatepicker]="picker">
        <mat-hint>MM/DD/YYYY</mat-hint>
        <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions>
      <button 
        mat-button 
        (click)="states.toSetPopulation()"
        [disabled]="!formGroup.valid">
        Next
      </button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class EnvironmentComponent implements OnInit {
  protected habitats: Habitat[] = [];
  @Input() formGroup!: FormGroup;

  protected get habitatGroup(): FormGroup { return this.formGroup.get('habitat') as FormGroup; }
  
  constructor(protected states: StatesService, habitatSvc: HabitatService) {
    habitatSvc.getHabitats().subscribe(habitats => this.habitats = habitats);
  }

  ngOnInit(): void {
    // TODO : This seems like a lot of code to write
    this.habitatGroup.get("id")?.valueChanges.subscribe(id => {
      this.habitatGroup.get("name")?.setValue(this.habitats.find(b => b.id === id)?.name);
    });
  }
}
