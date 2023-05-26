import { Component, Input } from '@angular/core';
import { Habitat } from '../environment/habitat.model';
import { Species } from '../population/species.model';
import { SessionService } from './session.service';

@Component({
  selector: 'app-session',
  styles: [ ],
  template: `
  <mat-card>
    <mat-card-header>
      <mat-card-title>Session</mat-card-title>
      <mat-card-subtitle>{{ sessSvc.stationControlValue }}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <mat-label>Session Type</mat-label>
      <mat-radio-group 
        [formControl]="sessSvc.sessionTypeControl"
        data-testid="session-type-group">
        <mat-radio-button 
          *ngFor="let sessionType of sessSvc.sessionTypes" 
          [value]="sessionType.id"
          data-testid="session-type-group-item"
        >{{ sessionType.name }}</mat-radio-button>
      </mat-radio-group>
    </mat-card-content>
    <mat-card-actions *ngIf="sessSvc.sessionType">
      <mat-button-toggle-group [(ngModel)]="sIdx">
        <mat-button-toggle 
          *ngFor="let idx of idxs" 
          [value]="idx"
          data-testid="idx-buttons"
        >{{ idx + 1 }}</mat-button-toggle>
      </mat-button-toggle-group>
    </mat-card-actions>
  </mat-card>

  <app-environment
    *ngIf="sessSvc.sessionType && state === 'ENVIRONMENT'"
    [sIdx]="sIdx"
    [habitats]="habitats"
    (go)="state = 'POPULATION'"
    data-testid="app-environment"
  ></app-environment>
  <app-population
    *ngIf="sessSvc.sessionType && state === 'POPULATION'"
    [sIdx]="sIdx"
    [species]="species"
    (done)="state = 'ENVIRONMENT'"
    data-testid="app-population"
  ></app-population>
  `,
})
export class SessionComponent {
  @Input() habitats!: Habitat[];
  @Input() species!: Species[];
  
  protected state: 'ENVIRONMENT' | 'POPULATION' = 'ENVIRONMENT';
  protected sIdx: number = 0;

  protected get idxs(): number[] {
    return this.sessSvc.isGilling
      ? this.sessSvc.gillingRuns
      : this.sessSvc.electrocutingRuns;
  }

  constructor(protected sessSvc: SessionService) { }
}
