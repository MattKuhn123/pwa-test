import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StatesService } from './states.service';
import { SessionTypeService } from './session/session-type.service';
import { StationService } from './station/station.service';
import { Station } from './station/station.model';

@Component({
  selector: 'app-init',
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
  <app-root
    [stations]="(stations | async)!"
  ></app-root>
  `,
})
export class InitComponent implements OnInit {

  protected stations!: Observable<Station[]>;

  constructor(protected state: StatesService,
    private sessionTypeSvc: SessionTypeService,
    private stationSvc: StationService) { }

  ngOnInit(): void {
    this.stations = this.stationSvc.getStations();
  }
}
