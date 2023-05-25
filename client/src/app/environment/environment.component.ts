import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Habitat } from './habitat.model';
import { FormGroupService } from '../form-group.service';

@Component({
  selector: 'app-environment',
  styles: [
    'mat-card-content { display: flex; flex-direction: column  }'
  ],
  template: `
  <mat-card [formGroup]="formGroupService.getEnvironmentGroup(sIdx)">
    <mat-card-content>
      <mat-form-field formGroupName="habitat" *ngIf="habitats">
        <mat-label>Habitat</mat-label>
        <mat-select formControlName="id">
          <mat-option *ngFor="let habitat of habitats" [value]="habitat.id">
            {{ habitat.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <p *ngIf="!habitats">please wait...</p>

      <mat-form-field>
        <mat-label>Leader</mat-label>
        <input formControlName="leader" matInput>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Date</mat-label>
        <input formControlName="date" matInput [matDatepicker]="picker">
        <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions>
      <button
        mat-button
        (click)="go.emit()"
      >Go</button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class EnvironmentComponent implements OnInit {
  @Output() go: EventEmitter<void> = new EventEmitter<void>();
  @Input() sIdx!: number;
  @Input() habitats!: Habitat[];

  constructor(protected formGroupService: FormGroupService) { }

  ngOnInit(): void {
    this.formGroupService.getHabitatGroup(this.sIdx).get("id")?.valueChanges.subscribe(id => {
      this.formGroupService.getHabitatGroup(this.sIdx).get("name")?.setValue(this.habitats.find(b => b.id === id)?.name);
    });
  }
}
