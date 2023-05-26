import { Component, Input, OnInit } from '@angular/core';
import { AppStateService } from './app-state.service';
import { Station } from './station/station.model';
import { Habitat } from './environment/habitat.model';
import { Species } from './population/species.model';
import { SessionService } from './session/session.service';

@Component({
  selector: 'app-root',
  styles: [ 'div { max-width: 75%; min-width: 50%; margin: auto; }' ],
  template: `
  <form [formGroup]="sessSvc.formGroup">
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
  <pre *ngIf="sessSvc.formGroup">{{ json }}</pre>
  `,
})
export class AppComponent implements OnInit {
  @Input() stations!: Station[];
  @Input() habitats!: Habitat[];
  @Input() species!: Species[];

  protected currentState!: string;

  constructor(protected appStateService: AppStateService, protected sessSvc: SessionService) { }

  ngOnInit(): void {
    this.appStateService.state.subscribe(nextState => this.currentState = nextState);
  }

  // Just for debugging
  protected get json(): string { return JSON.stringify(this.sessSvc.formGroup.getRawValue(), null, 4); }
}
