import { Component, Input, OnInit } from '@angular/core';
import { Depot } from './depot.model';
import { DepotService } from './depot.service';
import { StatesService } from '../states.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-depot',
  styles: [
    // TODO : issues with hover...
    '.selected { background-color: aliceblue }',
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Select depot</mat-card-title>
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
            (click)="this.formGroup.get('depot')?.setValue(row)"
            [class.selected]="row.id === formGroup.get('depot')?.get('id')?.getRawValue()"
          ></tr>
        </table>
        <p *ngIf="!depots.length">please wait...</p>
      </mat-card-content>
    </mat-card>
    <button 
      mat-button 
      (click)="states.toSetSetting()"
      [disabled]="!formGroup.get('depot')?.valid">
      Next
    </button>
  `,
})
export class DepotComponent implements OnInit {
  protected displayedColumns: string[] = ['id', 'name'];
  protected depots: Depot[] = [];
  @Input() formGroup!: FormGroup;

  constructor(private depotSvc: DepotService, protected states: StatesService) { }
  
  ngOnInit(): void { this.depotSvc.getDepots().subscribe((depots: any) => this.depots = depots); }
}
