import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StatesService } from '../states.service';
import { SessionTypeService } from './session-type.service';
import { SessionType } from './session-type.model';

@Component({
  selector: 'app-session-type',
  styles: [ ],
  template: `
    <mat-form-field [formGroup]="sessionTypeGroup" *ngIf="sessionTypes.length">
    <mat-label>Session Type</mat-label>
    <mat-select formControlName="id">
      <mat-option *ngFor="let sessionType of sessionTypes" [value]="sessionType.id">
        {{ sessionType.name }}
      </mat-option>
    </mat-select>
  </mat-form-field>
  <p *ngIf="!sessionTypes.length">please wait...</p>
  `,
})
export class SessionTypeComponent implements OnInit {
  protected get sessionTypes(): SessionType[] { return this.sessionTypeSvc.sessionTypes }
  @Input() sessionTypeGroup!: FormGroup;

  constructor(protected states: StatesService, private sessionTypeSvc: SessionTypeService) {  }

  ngOnInit(): void {
    // TODO : This seems like a lot of code to write
    this.sessionTypeGroup.get("id")?.valueChanges.subscribe(id => {
      this.sessionTypeGroup.get("name")?.setValue(this.sessionTypes.find(ot => ot.id === id)?.name);
    });
  }
}
