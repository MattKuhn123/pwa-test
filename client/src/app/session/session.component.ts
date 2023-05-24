import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { StatesService } from '../states.service';
import { SessionType } from './session-type.model';
import { SessionTypeService } from './session-type.service';

@Component({
  selector: 'app-session',
  styles: [ ],
  template: `
  <mat-card>
    <mat-card-header>
      <mat-card-title>Session</mat-card-title>
      <mat-card-subtitle>Enter session details</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <mat-form-field [formGroup]="sessionTypeGroup">
        <mat-label>Session Type</mat-label>
        <mat-select formControlName="id">
          <mat-option *ngFor="let sessionType of sessionTypes" [value]="sessionType.id">
            {{ sessionType.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions *ngIf="sessionType.id">
      <mat-button-toggle-group [(ngModel)]="selectedIdx">
        <!-- TODO : Make sure these don't go flying off the page -->
        <mat-button-toggle *ngFor="let idx of idxs" [value]="idx">{{ idx + 1}}</mat-button-toggle>
      </mat-button-toggle-group>
    </mat-card-actions>
  </mat-card>

  <app-environment
    *ngIf="sessionType.id && state === 'ENVIRONMENT'"
    [environmentGroup]="environmentGroup"
    (go)="state = 'POPULATION'"
  ></app-environment>
  <app-population
    *ngIf="sessionType.id && state === 'POPULATION'"
    [populationGroup]="populationGroup"
    (done)="state = 'ENVIRONMENT'"
  ></app-population>
  `,
})
export class SessionComponent implements OnInit {
  @Input() sessionTypeGroup!: FormGroup;
  @Input() gillingRunsArray!: FormArray;
  @Input() electrocutingRunsArray!: FormArray;

  protected state: 'ENVIRONMENT' | 'POPULATION' = 'ENVIRONMENT';
  protected selectedIdx: number = 0;
  
  protected get sessionTypes(): SessionType[] { return this.sessionTypeSvc.sessionTypes }
  protected get sessionType(): SessionType { return this.sessionTypeGroup.getRawValue() as SessionType; }
  protected get isGilling(): boolean { return this.sessionType.id === this.sessionTypeSvc.GILLING.id; }
  protected get isElectrocuting(): boolean {  return this.sessionType.id === this.sessionTypeSvc.ELETROCUTING.id; }
  protected get runGroup(): FormGroup {
    return this.isGilling
      ? this.gillingRunsArray.at(this.selectedIdx) as FormGroup
      : this.electrocutingRunsArray.at(this.selectedIdx) as FormGroup;
  }

  protected get environmentGroup(): FormGroup { return this.runGroup.get("environment") as FormGroup; }
  protected get populationGroup(): FormGroup { return this.runGroup.get("population") as FormGroup; }

  protected get idxs(): number[] {
    return this.isGilling
      ? this.sessionTypeSvc.GILLING_RUNS
      : this.sessionTypeSvc.ELECTROCUTING_RUNS;
  }

  constructor(protected states: StatesService, protected sessionTypeSvc: SessionTypeService) { }

  ngOnInit(): void {
    this.sessionTypeGroup.get("id")?.valueChanges.subscribe(id => {
      this.sessionTypeGroup.get("name")?.setValue(this.sessionTypes.find(st => st.id === id)?.name);
    });
  }
}
