import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatesService } from './states.service';
import { SessionTypeService } from './session/session-type.service';
import { StationService } from './station/station.service';
import { Station } from './station/station.model';
import { Habitat } from './environment/habitat.model';
import { HabitatService } from './environment/habitat.service';
import { Species } from './population/species.model';
import { SpeciesService } from './population/species.service';

@Component({
  selector: 'app-init',
  styles: [ 'mat-toolbar { margin-bottom: 10px; }' ],
  template: `
  <mat-toolbar>
    <button
      mat-button
      (click)="state.toSetStation()"
    >PWA Test</button>
  </mat-toolbar>
  <app-root
    [stations]="(stations | async)!"
    [habitats]="(habitats | async)!"
    [species]="(species | async)!"
  ></app-root>
  `,
})
export class InitComponent implements OnInit {
  protected stations!: Observable<Station[]>;
  protected habitats!: Observable<Habitat[]>;
  protected species!: Observable<Species[]>;

  constructor(private habitatSvc: HabitatService,
    private speciesSvc: SpeciesService,
    protected state: StatesService,
    private sessionTypeSvc: SessionTypeService,
    private stationSvc: StationService) { }

  ngOnInit(): void {
    this.stations = this.stationSvc.getStations();
    this.habitats = this.habitatSvc.getHabitats();
    this.species = this.speciesSvc.getSpecies();
  }
}
