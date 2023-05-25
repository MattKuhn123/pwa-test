import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HabitatService } from './habitat.service';
import { Habitat } from './habitat.model';

@Component({
  selector: 'app-environment',
  styles: [
    'mat-card-content { display: flex; flex-direction: column  }'
  ],
  template: `
  <mat-card [formGroup]="environmentGroup">
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
  @Input() environmentGroup!: FormGroup;
  @Input() habitats!: Habitat[];

  protected get habitatGroup(): FormGroup { return this.environmentGroup.get('habitat') as FormGroup; }

  ngOnInit(): void {
    this.habitatGroup.get("id")?.valueChanges.subscribe(id => {
      this.habitatGroup.get("name")?.setValue(this.habitats.find(b => b.id === id)?.name);
    });
  }
}
