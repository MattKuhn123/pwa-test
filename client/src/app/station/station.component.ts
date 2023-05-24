import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Station } from './station.model';
import { StationService } from './station.service';
import { StatesService } from '../states.service';

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
      <mat-selection-list [multiple]="false">
        <mat-list-option 
          *ngFor="let station of stations" 
          [value]="station.id"
          (click)="stationGroup.setValue(station)"
        >{{ station.name }}</mat-list-option>
      </mat-selection-list>
      <p *ngIf="!stations.length">please wait...</p>
    </mat-card-content>
    <mat-card-actions>
      <button 
        mat-button 
        (click)="states.toSetSession()"
        [disabled]="!stationGroup.valid">
        Next
      </button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class StatationComponent {
  protected displayedColumns: string[] = ['id', 'name'];
  protected stations: Station[] = [];
  @Input() stationGroup!: FormGroup;

  constructor(stationSvc: StationService, protected states: StatesService) {
    stationSvc.getStations().subscribe(stations => this.stations = stations);
  }
}
