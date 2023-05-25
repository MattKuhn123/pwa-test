import { Component, Input } from '@angular/core';
import { Station } from './station.model';
import { StateService } from '../state.service';
import { FormGroupService } from '../form-group.service';

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
          (click)="formGroupService.stationControl.setValue(station.id)"
          data-testid="station-list-item"
        >{{ station.name }}</mat-list-option>
      </mat-selection-list>
      <p *ngIf="!stations">please wait...</p>
    </mat-card-content>
    <mat-card-actions>
      <button 
        mat-button 
        (click)="states.toSetSession()"
        [disabled]="!formGroupService.stationControl.valid">
        Next
      </button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class StationComponent {
  protected displayedColumns: string[] = ['id', 'name'];
  @Input() stations!: Station[];

  constructor(protected states: StateService,
    protected formGroupService: FormGroupService) { }
}
