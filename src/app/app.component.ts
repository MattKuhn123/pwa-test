import { Component } from '@angular/core';
import { StatesService } from './states.service';

@Component({
  selector: 'app-root',
  styles: [],
  template: `
  <mat-toolbar>
    <span>PWA Test</span>
  </mat-toolbar>
  <div [ngSwitch]="currentState">
    <div *ngSwitchCase="'START'">
      <app-depot></app-depot>
    </div>
  </div>
  `,
})
export class AppComponent {

  protected currentState!: string;
  constructor(private state: StatesService) {
    this.state.state.subscribe(nextState => this.currentState = nextState);
  }


}
