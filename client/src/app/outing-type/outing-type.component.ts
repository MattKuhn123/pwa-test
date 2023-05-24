import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StatesService } from '../states.service';
import { OutingTypeService } from './outing-type.service';
import { OutingType } from './outing-type.model';

@Component({
  selector: 'app-outing-type',
  styles: [ ],
  template: `
  <mat-card [formGroup]="formGroup">
    <mat-card-header>
      <mat-card-title>Outing Type</mat-card-title>
      <mat-card-subtitle>Select outing type</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <mat-form-field *ngIf="outingTypes.length">
        <mat-label>Outing Type</mat-label>
        <mat-select formControlName="id">
          <mat-option *ngFor="let outingType of outingTypes" [value]="outingType.id">
            {{ outingType.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <p *ngIf="!outingTypes.length">please wait...</p>
    </mat-card-content>
    <mat-card-actions>
      <button 
        mat-button 
        (click)="states.toSetEnvironment()"
        [disabled]="!formGroup.valid">
        Next
      </button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class OutingTypeComponent implements OnInit {
  protected outingTypes: OutingType[] = [];
  @Input() formGroup!: FormGroup;

  constructor(protected states: StatesService, outingTypeSvc: OutingTypeService) {
    outingTypeSvc.getOutingTypes().subscribe(outingTypes => this.outingTypes = outingTypes);
  }

  ngOnInit(): void {
    // TODO : This seems like a lot of code to write
    this.formGroup.get("id")?.valueChanges.subscribe(id => {
      this.formGroup.get("name")?.setValue(this.outingTypes.find(ot => ot.id === id)?.name);
    });
  }
}
