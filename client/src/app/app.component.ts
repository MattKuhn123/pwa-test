import { Component } from '@angular/core';
import { StatesService } from './states.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionType } from './session-type/session-type.model';
import { SessionTypeService } from './session-type/session-type.service';

const GILLING_RUNS: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
const ELECTROCUTING_RUNS: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];

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
        [stationGroup]="stationGroup"
        ></app-station>
      <app-session
        *ngSwitchCase="'SET_SESSION'"
        [sessionTypeGroup]="sessionTypeGroup"
      ></app-session>
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
  protected get sessionTypeGroup(): FormGroup { return this.formGroup.get('sessionType') as FormGroup; }
  protected get gillingRunsArray(): FormArray { return this.formGroup.get('gillingRuns') as FormArray; }
  protected get electrocutingRunsArray(): FormArray { return this.formGroup.get('electrocutingRuns') as FormArray; }

  protected get sessionType(): SessionType { return this.sessionTypeGroup.getRawValue() as SessionType; }
  protected get isGilling(): boolean { return this.sessionType === this.sessionTypeSvc.GILLING; }
  protected get isElectrocuting(): boolean {  return this.sessionType === this.sessionTypeSvc.ELETROCUTING; }

  constructor(protected state: StatesService,
    private sessionTypeSvc: SessionTypeService,
    private formBuilder: FormBuilder) {
    this.state.state.subscribe(nextState => this.currentState = nextState);

    this.formGroup = this.formBuilder.group({
      station: this.formBuilder.group({
        id: this.formBuilder.control('', Validators.required),
        name: this.formBuilder.control('', Validators.required),
      }),
      sessionType: this.formBuilder.group({
        id: this.formBuilder.control('', Validators.required),
        name: this.formBuilder.control('', Validators.required),
      }),

      gillingRuns: this.formBuilder.array(GILLING_RUNS.map(_ => this.newRunGroup())),
      electrocutingRuns: this.formBuilder.array(ELECTROCUTING_RUNS.map(_ => this.newRunGroup()))
    });
  }

  private newRunGroup(): FormGroup {
    return this.formBuilder.group({
      population: this.formBuilder.group({
        species: this.formBuilder.group({
          id: this.formBuilder.control('', Validators.required),
          name: this.formBuilder.control('', Validators.required),
        }),
        count: this.formBuilder.control('', [Validators.required, Validators.min(0)]),
      }),
      environment: this.formBuilder.group({
        date: this.formBuilder.control('', Validators.required),
        leader: this.formBuilder.control('', Validators.required),
        habitat: this.formBuilder.group({
          id: this.formBuilder.control('', Validators.required),
          name: this.formBuilder.control('', Validators.required),
        }),
      })
    })
  }

  // Just for debugging
  protected get json(): string { return JSON.stringify(this.formGroup.getRawValue(), null, 4); }
}
