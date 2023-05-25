import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StatesService } from './states.service';
import { SessionTypeService } from './session/session-type.service';
import { SaveService } from './save.service';
import { Station } from './station/station.model';
import { Habitat } from './environment/habitat.model';
import { Species } from './population/species.model';

@Component({
  selector: 'app-root',
  styles: [ 'div { max-width: 75%; min-width: 50%; margin: auto; }' ],
  template: `
  <form [formGroup]="formGroup">
    <div [ngSwitch]="currentState">
      <app-station
        *ngSwitchCase="'SET_STATION'"
        [stationGroup]="stationGroup"
        [stations]="stations"
        data-testid="app-station"
      ></app-station>
      <app-session
        *ngSwitchCase="'SET_SESSION'"
        [sessionTypeGroup]="sessionTypeGroup"
        [gillingRunsArray]="gillingRunsArray"
        [electrocutingRunsArray]="electrocutingRunsArray"
        [habitats]="habitats"
        [species]="species"
        data-testid="app-session"
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
  @Input() stations!: Station[];
  @Input() habitats!: Habitat[];
  @Input() species!: Species[];

  protected currentState!: string;
  protected formGroup!: FormGroup;

  protected get stationGroup(): FormGroup { return this.formGroup.get('station') as FormGroup; }
  protected get sessionTypeGroup(): FormGroup { return this.formGroup.get('sessionType') as FormGroup; }
  protected get gillingRunsArray(): FormArray { return this.formGroup.get('gillingRuns') as FormArray; }
  protected get electrocutingRunsArray(): FormArray { return this.formGroup.get('electrocutingRuns') as FormArray; }

  private get stationGroupId(): FormControl { return this.stationGroup.get("id") as FormControl; }
  private get stationGroupIdValue(): string { return this.stationGroupId?.getRawValue(); }

  constructor(protected state: StatesService,
    private formBuilder: FormBuilder,
    private sessionTypeSvc: SessionTypeService,
    private saveSvc: SaveService) { }

  ngOnInit(): void {
    this.state.state.subscribe(nextState => this.currentState = nextState);
    this.formGroup = this.newFormGroup();
    this.stationGroup.valueChanges.subscribe(_ => this.load());
    this.formGroup.valueChanges.subscribe(_ => this.save());
  }

  private newFormGroup(): FormGroup {
    return this.formBuilder.group({
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
    })
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

  private load(): void {
    const lastSession: any = this.saveSvc.load(this.stationGroupIdValue);
    if (lastSession) {
      this.formGroup.setValue(lastSession, { emitEvent: false });
    } else {
      const retainStation: Station = this.stationGroup.getRawValue();
      this.formGroup.reset(undefined, { emitEvent: false });
      this.stationGroup.setValue(retainStation, { emitEvent: false });
    }
  }

  private save(): void {
    if (!this.stationGroupIdValue) {
      return;
    }

    if (this.currentState === 'SET_STATION') {
      return;
    }

    this.saveSvc.save(this.stationGroupIdValue, this.formGroup.getRawValue());
  }

  // Just for debugging
  protected get json(): string { return JSON.stringify(this.formGroup.getRawValue(), null, 4); }
}
