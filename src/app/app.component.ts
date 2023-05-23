import { Component } from '@angular/core';
import { StatesService } from './states.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  styles: [],
  template: `
  <mat-toolbar>
    <span>PWA Test</span>
  </mat-toolbar>
  <form formGroup="formGroup">
    <div [ngSwitch]="currentState">
      <app-depot *ngSwitchCase="'SET_DEPOT'" [formGroup]="formGroup"></app-depot>
      <div *ngSwitchCase="'SET_SETTING'">TODO</div>
      <p *ngSwitchDefault>Default...</p>
    </div>
  </form>
  <pre *ngIf="formGroup">{{ json }}</pre>
  `,
})
export class AppComponent {
  protected currentState!: string;
  protected formGroup!: FormGroup;

  protected get json(): string { return JSON.stringify(this.formGroup.getRawValue(), null, 4); }

  constructor(private state: StatesService, private formBuilder: FormBuilder) {
    this.state.state.subscribe(nextState => this.currentState = nextState);

    this.formGroup = this.formBuilder.group({
      depot: this.formBuilder.group({
        id: this.formBuilder.control('', Validators.required),
        name: this.formBuilder.control('', Validators.required),
      })
    });
  }
}
