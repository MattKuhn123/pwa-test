import { Component } from '@angular/core';
import { StatesService } from './states.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  styles: [
    'div { max-width: 400px; margin: auto }',
    'mat-toolbar { margin-bottom: 10px }'
  ],
  template: `
  <mat-toolbar>
    <button 
      mat-button 
      (click)="state.toSetDepot()"
    >PWA Test</button>
  </mat-toolbar>
  <form [formGroup]="formGroup">
    <div [ngSwitch]="currentState">
      <app-depot 
        *ngSwitchCase="'SET_DEPOT'" 
        [formGroup]="depotGroup"
      ></app-depot>
      <app-setting 
        *ngSwitchCase="'SET_SETTING'" 
        [formGroup]="settingGroup"
      ></app-setting>
      <p *ngSwitchDefault>
        Default...
      </p>
    </div>
  </form>
  <pre *ngIf="formGroup">{{ json }}</pre>
  `,
})
export class AppComponent {
  protected currentState!: string;
  protected formGroup!: FormGroup;

  protected get depotGroup(): FormGroup { return this.formGroup.get('depot') as FormGroup; }
  protected get settingGroup(): FormGroup { return this.formGroup.get('setting') as FormGroup; }

  protected get json(): string { return JSON.stringify(this.formGroup.getRawValue(), null, 4); }

  constructor(protected state: StatesService, private formBuilder: FormBuilder) {
    this.state.state.subscribe(nextState => this.currentState = nextState);

    this.formGroup = this.formBuilder.group({
      depot: this.formBuilder.group({
        id: this.formBuilder.control('', Validators.required),
        name: this.formBuilder.control('', Validators.required),
      }),
      setting: this.formBuilder.group({
        date: this.formBuilder.control('', Validators.required),
        leader: this.formBuilder.control('', Validators.required),
        biome: this.formBuilder.group({
          id: this.formBuilder.control('', Validators.required),
          name: this.formBuilder.control('', Validators.required),
        }),
      }),
    });
  }
}
