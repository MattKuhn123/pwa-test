import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Station } from './station.model';
import { StationService } from './station.service';
import { StatesService } from '../states.service';

@Component({
  selector: 'app-station',
  styles: [
    '.selected { background-color: aliceblue }', // TODO : issues with hover...
  ],
  template: `
  <mat-card>
    <mat-card-header>
      <mat-card-title>Station</mat-card-title>
      <mat-card-subtitle>Station details</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <table *ngIf="stations.length" mat-table [dataSource]="stations">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> Id </th>
          <td mat-cell *matCellDef="let element"> {{ element.id }} </td>
        </ng-container>
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let element"> {{element.name}} </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr 
          mat-row 
          *matRowDef="let row; columns: displayedColumns;"
          (click)="this.formGroup.setValue(row)"
          [class.selected]="row.id === formGroup.get('id')?.getRawValue()"
        ></tr>
      </table>
      <p *ngIf="!stations.length">please wait...</p>
    </mat-card-content>
    <mat-card-actions>
      <button 
        mat-button 
        (click)="states.toSetOutingType()"
        [disabled]="!formGroup.valid">
        Next
      </button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class StatationComponent {
  protected displayedColumns: string[] = ['id', 'name'];
  protected stations: Station[] = [];
  @Input() formGroup!: FormGroup;

  constructor(stationSvc: StationService, protected states: StatesService) {
    stationSvc.getStations().subscribe(stations => this.stations = stations);
  }
}
