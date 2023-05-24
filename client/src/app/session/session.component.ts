import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StatesService } from '../states.service';

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
      <app-session-type
        [sessionTypeGroup]="sessionTypeGroup"
      ></app-session-type>
    </mat-card-content>
    <mat-card-actions>
    </mat-card-actions>
  </mat-card>
  `,
})
export class SessionComponent implements OnInit {
  @Input() sessionTypeGroup!: FormGroup;

  constructor(protected states: StatesService) { }

  ngOnInit(): void { }
}
