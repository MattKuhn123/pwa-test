import { Component, Input } from '@angular/core';
import { Station } from './station.model';
import { AppStateService } from '../app-state.service';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-station',
  styles: [ ],
  template: `
  <mat-card>
    <mat-card-header>
      <mat-card-title>Station</mat-card-title>
      <mat-card-subtitle>Station details</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <mat-selection-list 
        [multiple]="false"
        data-testid="station-list">
        <mat-list-option 
          *ngFor="let station of stations" 
          [value]="station.id"
          (click)="sessSvc.stationControl.setValue(station.id)"
          data-testid="station-list-item"
        >{{ station.name }}</mat-list-option>
      </mat-selection-list>
      <p *ngIf="!stations">please wait...</p>
    </mat-card-content>
    <mat-card-actions>
      <button 
        mat-button 
        (click)="appStateSvc.toSetSession()"
        [disabled]="!sessSvc.stationControl.valid"
      >Next</button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class StationComponent {
  @Input() stations!: Station[];

  constructor(protected appStateSvc: AppStateService, protected sessSvc: SessionService) { }
}
