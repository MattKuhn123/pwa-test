import { Component, Input } from '@angular/core';
import { Habitat } from '../environment/habitat.model';
import { Species } from '../population/species.model';
import { FormGroupService } from '../form-group.service';

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
        <mat-label>Session Type</mat-label>
        <mat-radio-group [formControl]="formGroupService.sessionTypeControl">
          <mat-radio-button *ngFor="let sessionType of formGroupService.sessionTypes" [value]="sessionType.id">
            {{ sessionType.name }}
          </mat-radio-button>
        </mat-radio-group>
    </mat-card-content>
    <mat-card-actions *ngIf="formGroupService.sessionType">
      <mat-button-toggle-group [(ngModel)]="sIdx">
        <!-- TODO : Make sure these don't go flying off the page -->
        <mat-button-toggle *ngFor="let idx of idxs" [value]="idx">{{ idx + 1 }}</mat-button-toggle>
      </mat-button-toggle-group>
    </mat-card-actions>
  </mat-card>

  <app-environment
    *ngIf="formGroupService.sessionType && state === 'ENVIRONMENT'"
    [sIdx]="sIdx"
    [habitats]="habitats"
    (go)="state = 'POPULATION'"
  ></app-environment>
  <app-population
    *ngIf="formGroupService.sessionType && state === 'POPULATION'"
    [sIdx]="sIdx"
    [species]="species"
    (done)="state = 'ENVIRONMENT'"
  ></app-population>
  `,
})
export class SessionComponent {
  @Input() habitats!: Habitat[];
  @Input() species!: Species[];
  
  protected state: 'ENVIRONMENT' | 'POPULATION' = 'ENVIRONMENT';
  protected sIdx: number = 0;

  protected get idxs(): number[] {
    return this.formGroupService.isGilling
      ? this.formGroupService.gillingRuns
      : this.formGroupService.electrocutingRuns;
  }

  constructor(protected formGroupService: FormGroupService) { }
}
