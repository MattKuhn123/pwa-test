import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StatesService } from '../states.service';

@Component({
  selector: 'app-outing',
  styles: [ ],
  template: `
  <mat-card [formGroup]="formGroup">
    <mat-card-header>
      <mat-card-title>Outing</mat-card-title>
      <mat-card-subtitle>Enter outing details</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
    </mat-card-content>
    <mat-card-actions>
    </mat-card-actions>
  </mat-card>
  `,
})
export class OutingComponent implements OnInit {
  @Input() formGroup!: FormGroup;

  constructor(protected states: StatesService) { }

  ngOnInit(): void { }
}
