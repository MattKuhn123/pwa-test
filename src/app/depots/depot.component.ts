import { Component, OnInit } from '@angular/core';
import { Depot } from './depot.model';
import { DepotService } from './depot.service';
import { StatesService } from '../states.service';

@Component({
  selector: 'app-depot',
  styles: [],
  template: `
    <p>Depot works!</p>
    <button mat-button (click)="onClickNext()">Next</button>
  `,
})
export class DepotComponent implements OnInit {
  depots: Depot[] = [];

  constructor(private depotService: DepotService, 
    private states: StatesService) { }
  
  ngOnInit(): void {
    this.depotService.getDepots().subscribe(depots => {
      this.depots = depots;
    });
  }

  protected onClickNext(): void {
    this.states.state.next("SET_SETTING");
  }
}
