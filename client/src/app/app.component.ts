import { Component, Input, OnInit } from '@angular/core';
import { StateService } from './state.service';
import { SaveService } from './save.service';
import { Station } from './station/station.model';
import { Habitat } from './environment/habitat.model';
import { Species } from './population/species.model';
import { FormGroupService } from './form-group.service';

@Component({
  selector: 'app-root',
  styles: [ 'div { max-width: 75%; min-width: 50%; margin: auto; }' ],
  template: `
  <form [formGroup]="formGroupSvc.formGroup">
    <div [ngSwitch]="currentState">
      <app-station
        *ngSwitchCase="'SET_STATION'"
        [stations]="stations"
        data-testid="app-station"
      ></app-station>
      <app-session
        *ngSwitchCase="'SET_SESSION'"
        [habitats]="habitats"
        [species]="species"
        data-testid="app-session"
      ></app-session>
      <p *ngSwitchDefault>
        Invalid state, please go back
      </p>
    </div>
  </form>
  <pre *ngIf="formGroupSvc.formGroup">{{ json }}</pre>
  `,
})
export class AppComponent implements OnInit {
  @Input() stations!: Station[];
  @Input() habitats!: Habitat[];
  @Input() species!: Species[];

  protected currentState!: string;

  constructor(protected state: StateService,
    private saveSvc: SaveService,
    protected formGroupSvc: FormGroupService) { }

  ngOnInit(): void {
    this.state.state.subscribe(nextState => this.currentState = nextState);
    
    this.formGroupSvc.stationGroup.valueChanges.subscribe(_ => this.load());
    this.formGroupSvc.formGroup.valueChanges.subscribe(_ => this.save());
  }

  private load(): void {
    const lastSession: any = this.saveSvc.load(this.formGroupSvc.stationGroupIdValue);
    if (lastSession) {
      this.formGroupSvc.formGroup.setValue(lastSession, { emitEvent: false });
    } else {
      const retainStation: Station = this.formGroupSvc.stationGroup.getRawValue();
      this.formGroupSvc.formGroup.reset(undefined, { emitEvent: false });
      this.formGroupSvc.stationGroup.setValue(retainStation, { emitEvent: false });
    }
  }

  private save(): void {
    if (!this.formGroupSvc.stationGroupIdValue) {
      return;
    }

    if (this.currentState === 'SET_STATION') {
      return;
    }

    this.saveSvc.save(this.formGroupSvc.stationGroupIdValue, this.formGroupSvc.formGroup.getRawValue());
  }

  // Just for debugging
  protected get json(): string { return JSON.stringify(this.formGroupSvc.formGroup.getRawValue(), null, 4); }
}
