import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionTypeService } from '../session-type/session-type.service';
import { SessionType } from '../session-type/session-type.model';
import { Station } from '../station/station.model';
import { SessionSaveService } from './session-save.service';
import { AppStateService } from '../app-state.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public get formGroup(): FormGroup { return this._formGroup; }
  public _formGroup!: FormGroup;
  protected currentState!: string;
  
  public get gilling(): SessionType { return this.sessionTypeSvc.gilling; }
  public get gillingRuns(): number[] { return this.sessionTypeSvc.gillingRuns; }
  public get gillingRunsArray(): FormArray { return this.formGroup.get('gillingRuns') as FormArray; }
  public get electrocuting(): SessionType { return this.sessionTypeSvc.electrocuting; }
  public get electrocutingRuns(): number[] { return this.sessionTypeSvc.electrocutingRuns; }
  public get electrocutingRunsArray(): FormArray { return this.formGroup.get('electrocutingRuns') as FormArray; }

  public get stationControl(): FormControl { return this.formGroup.get('station') as FormControl; }
  public get stationControlValue(): string { return this.stationControl?.getRawValue(); }
  
  public get sessionTypeControl(): FormControl { return this.formGroup.get('sessionType') as FormControl; }
  public get sessionTypes(): SessionType[] { return this.sessionTypeSvc.sessionTypes; }
  public get sessionType(): string { return this.sessionTypeControl.getRawValue() as string; }
  public get isGilling(): boolean { return this.sessionType === this.sessionTypeSvc.gilling.id; }

  public getRunGroup(sIdx: number): FormGroup {
    return this.isGilling
      ? this.gillingRunsArray.at(sIdx) as FormGroup
      : this.electrocutingRunsArray.at(sIdx) as FormGroup;
  }

  public getEnvironmentGroup(sIdx: number): FormGroup { return this.getRunGroup(sIdx).get("environment") as FormGroup; }
  public getPopulationGroup(sIdx: number): FormGroup { return this.getRunGroup(sIdx).get("population") as FormGroup; }

  constructor(private formBuilder: FormBuilder,
    private appStateSvc: AppStateService,
    private saveSvc: SessionSaveService,
    private sessionTypeSvc: SessionTypeService) {
    this._formGroup = this.newFormGroup();
    this._formGroup.valueChanges.subscribe(() => this.save());
    this.stationControl.valueChanges.subscribe(() => this.load());
    this.appStateSvc.state.subscribe(nextState => this.currentState = nextState);
  }

  private load(): void {
    const previousSession: any = this.saveSvc.load(this.stationControlValue);
    if (previousSession) {
      this.formGroup.setValue(previousSession, { emitEvent: false });
    } else {
      const retainStation: Station = this.stationControl.getRawValue();
      this.formGroup.reset(undefined, { emitEvent: false });
      this.stationControl.setValue(retainStation, { emitEvent: false });
    }
  }

  private save(): void {
    if (!this.stationControlValue || this.currentState === 'SET_STATION') {
      return;
    }

    const currentSession = this.formGroup.getRawValue();
    this.saveSvc.save(this.stationControlValue, currentSession);
  }

  private newFormGroup(): FormGroup {
    return this.formBuilder.group({
      station: this.formBuilder.control('', Validators.required),
      sessionType: this.formBuilder.control('', Validators.required),
      gillingRuns: this.formBuilder.array(this.sessionTypeSvc.gillingRuns.map(() => this.newRunGroup())),
      electrocutingRuns: this.formBuilder.array(this.sessionTypeSvc.electrocutingRuns.map(() => this.newRunGroup()))
    });
  }

  private newRunGroup(): FormGroup {
    return this.formBuilder.group({
      population: this.formBuilder.group({
        species: this.formBuilder.control('', Validators.required),
        count: this.formBuilder.control('', [Validators.required, Validators.min(0)]),
      }),
      environment: this.formBuilder.group({
        date: this.formBuilder.control('', Validators.required),
        leader: this.formBuilder.control('', Validators.required),
        habitat: this.formBuilder.control('', Validators.required),
      })
    });
  }
}
