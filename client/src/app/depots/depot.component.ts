import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Depot } from './depot.model';
import { DepotService } from './depot.service';
import { StatesService } from '../states.service';

@Component({
  selector: 'app-depot',
  styles: [
    '.selected { background-color: aliceblue }', // TODO : issues with hover...
  ],
  template: `
  <mat-card>
    <mat-card-header>
      <mat-card-title>Depot</mat-card-title>
      <mat-card-subtitle>Depot details</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <table *ngIf="depots.length" mat-table [dataSource]="depots">
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
      <p *ngIf="!depots.length">please wait...</p>
    </mat-card-content>
    <mat-card-actions>
      <button 
        mat-button 
        (click)="states.toSetSetting()"
        [disabled]="!formGroup.valid">
        Next
      </button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class DepotComponent {
  protected displayedColumns: string[] = ['id', 'name'];
  protected depots: Depot[] = [];
  @Input() formGroup!: FormGroup;

  constructor(depotSvc: DepotService, protected states: StatesService) {
    depotSvc.getDepots().subscribe(depots => this.depots = depots);
  }
}
