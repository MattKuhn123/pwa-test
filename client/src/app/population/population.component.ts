import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Species } from './species.model';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-population',
  styles: [ ],
  template: `
  <mat-card [formGroup]="fgSvc.getPopulationGroup(sIdx)">
    <mat-card-content>
      <mat-form-field *ngIf="species">
        <mat-label>Species</mat-label>
        <mat-select formControlName="species">
          <mat-option *ngFor="let spec of species" [value]="spec.id">
            {{ spec.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <p *ngIf="!species">please wait...</p>

      <mat-form-field>
        <mat-label>Count</mat-label>
        <input type="number" formControlName="count" matInput>
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions>
      <button
        mat-button
        (click)="done.emit()"
      >Done</button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class PopulationComponent {
  @Output() done: EventEmitter<void> = new EventEmitter<void>();
  @Input() sIdx!: number;
  @Input() species!: Species[];

  constructor(protected fgSvc: SessionService) { }
}
