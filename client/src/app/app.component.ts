import { Component, OnInit } from '@angular/core';
import { StatesService } from './states.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionTypeService } from './session/session-type.service';
import { SaveService } from './save.service';

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
        [gillingRunsArray]="gillingRunsArray"
        [electrocutingRunsArray]="electrocutingRunsArray"
      ></app-session>
      <p *ngSwitchDefault>
        Invalid state, please go back
      </p>
    </div>
  </form>
  <pre *ngIf="formGroup">{{ json }}</pre>
  `,
})
export class AppComponent implements OnInit {
  protected currentState!: string;
  protected formGroup!: FormGroup;

  protected loadCount: number = 0;

  protected get stationGroup(): FormGroup { return this.formGroup.get('station') as FormGroup; }
  protected get sessionTypeGroup(): FormGroup { return this.formGroup.get('sessionType') as FormGroup; }
  protected get gillingRunsArray(): FormArray { return this.formGroup.get('gillingRuns') as FormArray; }
  protected get electrocutingRunsArray(): FormArray { return this.formGroup.get('electrocutingRuns') as FormArray; }

  private get stationGroupId(): FormControl { return this.stationGroup.get("id") as FormControl; }
  private get stationGroupIdValue(): string { return this.stationGroupId?.getRawValue(); }

  public get canSave(): boolean {
    if (!this.stationGroupIdValue) {
      return false;
    }

    if (this.currentState === 'SET_STATION') {
      return false;
    }

    return true;
  }

  constructor(protected state: StatesService,
    private formBuilder: FormBuilder,
    private sessionTypeSvc: SessionTypeService,
    private saveSvc: SaveService) { }

  ngOnInit(): void {
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
      gillingRuns: this.formBuilder.array(this.sessionTypeSvc.GILLING_RUNS.map(_ => this.newRunGroup())),
      electrocutingRuns: this.formBuilder.array(this.sessionTypeSvc.ELECTROCUTING_RUNS.map(_ => this.newRunGroup()))
    });


    this.stationGroup.valueChanges.subscribe(_ => {
      const lastSession: any = this.saveSvc.load(this.stationGroupIdValue);
      if (lastSession) {
        console.log(`loadCount: ${this.loadCount}`);
        this.formGroup.setValue(lastSession, { emitEvent: false });
      }
    })

    this.formGroup.valueChanges.subscribe(_ => {
      if (!this.canSave) {
        return;
      }

      this.saveSvc.save(this.stationGroupIdValue, this.formGroup.getRawValue());
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
