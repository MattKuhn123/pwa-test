import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BiomeService } from './biome.service';
import { Biome } from './biome.model';
import { StatesService } from '../states.service';

@Component({
  selector: 'app-setting',
  styles: [
    'mat-card-content { display: flex; flex-direction: column  }'
  ],
  template: `
  <mat-card [formGroup]="formGroup">
    <mat-card-header>
      <mat-card-title>Enter the setting</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <mat-form-field formGroupName="biome" *ngIf="biomes.length">
        <mat-label>Biome</mat-label>
        <mat-select formControlName="id">
          <mat-option *ngFor="let biome of biomes" [value]="biome.id">
            {{ biome.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <p *ngIf="!biomes.length">please wait...</p>

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
        (click)="states.toSetPopulationData()"
        [disabled]="!formGroup.valid">
        Next
      </button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class SettingComponent implements OnInit {
  protected biomes: Biome[] = [];
  @Input() formGroup!: FormGroup;

  protected get biomeGroup(): FormGroup { return this.formGroup.get('biome') as FormGroup; }
  
  constructor(protected states: StatesService, biomeSvc: BiomeService) {
    biomeSvc.getBiomes().subscribe(biomes => this.biomes = biomes);
  }

  ngOnInit(): void {
    // TODO : This seems like a lot of code to write
    this.biomeGroup.get("id")?.valueChanges.subscribe(id => {
      this.biomeGroup.get("name")?.setValue(this.biomes.find(b => b.id === id)?.name);
    });
  }
}
