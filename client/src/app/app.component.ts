import { Component } from '@angular/core';
import { StatesService } from './states.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  styles: [
    'div { max-width: 75%; min-width: 50%; margin: auto; }',
    'mat-toolbar { margin-bottom: 10px; }',
  ],
  template: `
  <mat-toolbar>
    <button
      mat-button
      (click)="state.toSetStation()"
    >PWA Test</button>
  </mat-toolbar>
  <form [formGroup]="formGroup">
    <div [ngSwitch]="currentState">
      <app-station
        *ngSwitchCase="'SET_STATION'"
        [formGroup]="stationGroup"
        ></app-station>
      <app-outing-type
        *ngSwitchCase="'SET_OUTING_TYPE'"
        [formGroup]="outingTypeGroup"
      ></app-outing-type>
      <app-environment
        *ngSwitchCase="'SET_ENVIRONMENT'"
        [formGroup]="environmentGroup"
      ></app-environment>
      <app-population
        *ngSwitchCase="'SET_POPULATION'"
        [formGroup]="populationGroup"
      ></app-population>
      <p *ngSwitchDefault>
        Invalid state, please go back
      </p>
    </div>
  </form>
  <pre *ngIf="formGroup">{{ json }}</pre>
  `,
})
export class AppComponent {
  protected currentState!: string;
  protected formGroup!: FormGroup;

  protected get stationGroup(): FormGroup { return this.formGroup.get('station') as FormGroup; }
  protected get outingTypeGroup(): FormGroup { return this.formGroup.get('outingType') as FormGroup; }
  protected get environmentGroup(): FormGroup { return this.formGroup.get('environment') as FormGroup; }
  protected get populationGroup(): FormGroup { return this.formGroup.get('population') as FormGroup; }
  
  protected get json(): string { return JSON.stringify(this.formGroup.getRawValue(), null, 4); }

  constructor(protected state: StatesService, private formBuilder: FormBuilder) {
    this.state.state.subscribe(nextState => this.currentState = nextState);

    this.formGroup = this.formBuilder.group({
      station: this.formBuilder.group({
        id: this.formBuilder.control('', Validators.required),
        name: this.formBuilder.control('', Validators.required),
      }),
      outingType: this.formBuilder.group({
        id: this.formBuilder.control('', Validators.required),
        name: this.formBuilder.control('', Validators.required),
      }),
      environment: this.newEnvironmentGroup(),
      population: this.newPopulationGroup()
    });
  }

  private newPopulationGroup(): FormGroup {
    return this.formBuilder.group({
      species: this.formBuilder.group({
        id: this.formBuilder.control('', Validators.required),
        name: this.formBuilder.control('', Validators.required),
      }),
      count: this.formBuilder.control('', [Validators.required, Validators.min(0)]),
    });
  }

  private newEnvironmentGroup(): FormGroup {
    return this.formBuilder.group({
      date: this.formBuilder.control('', Validators.required),
      leader: this.formBuilder.control('', Validators.required),
      habitat: this.formBuilder.group({
        id: this.formBuilder.control('', Validators.required),
        name: this.formBuilder.control('', Validators.required),
      }),
    });
  }
}
