import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionTypeService } from './session/session-type.service';
import { SessionType } from './session/session-type.model';

@Injectable({
  providedIn: 'root'
})
export class FormGroupService {
  public _formGroup!: FormGroup;
  public get gillingRuns(): number[] { return this.sessionTypeSvc.gillingRuns }
  public get electrocutingRuns(): number[] { return this.sessionTypeSvc.electrocutingRuns }

  public get formGroup(): FormGroup { return this._formGroup }

  public get stationGroup(): FormGroup { return this.formGroup.get('station') as FormGroup; }
  public get sessionTypeGroup(): FormGroup { return this.formGroup.get('sessionType') as FormGroup; }
  public get gillingRunsArray(): FormArray { return this.formGroup.get('gillingRuns') as FormArray; }
  public get electrocutingRunsArray(): FormArray { return this.formGroup.get('electrocutingRuns') as FormArray; }

  public get stationGroupId(): FormControl { return this.stationGroup.get("id") as FormControl; }
  public get stationGroupIdValue(): string { return this.stationGroupId?.getRawValue(); }

  public get sessionTypes(): SessionType[] { return this.sessionTypeSvc.sessionTypes }
  public get sessionType(): SessionType { return this.sessionTypeGroup.getRawValue() as SessionType; }
  public get isGilling(): boolean { return this.sessionType.id === this.sessionTypeSvc.gilling.id; }
  public get isElectrocuting(): boolean {  return this.sessionType.id === this.sessionTypeSvc.electrocuting.id; }

  public getRunGroup(sIdx: number): FormGroup {
    return this.isGilling
      ? this.gillingRunsArray.at(sIdx) as FormGroup
      : this.electrocutingRunsArray.at(sIdx) as FormGroup;
  }

  public getEnvironmentGroup(sIdx: number): FormGroup { return this.getRunGroup(sIdx).get("environment") as FormGroup; }
  public getPopulationGroup(sIdx: number): FormGroup { return this.getRunGroup(sIdx).get("population") as FormGroup; }

  public getHabitatGroup(sIdx: number): FormGroup { return this.getEnvironmentGroup(sIdx).get('habitat') as FormGroup; }
  public getSpeciesGroup(sIdx: number): FormGroup { return this.getPopulationGroup(sIdx).get('species') as FormGroup; }

  constructor(private formBuilder: FormBuilder,
    private sessionTypeSvc: SessionTypeService) {
    this._formGroup = this.newFormGroup();
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
      gillingRuns: this.formBuilder.array(this.sessionTypeSvc.gillingRuns.map(() => this.newRunGroup())),
      electrocutingRuns: this.formBuilder.array(this.sessionTypeSvc.electrocutingRuns.map(() => this.newRunGroup()))
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
    });
  }
}
