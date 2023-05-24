import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  private _state: BehaviorSubject<string> = new BehaviorSubject('SET_STATION');
  public get state(): Observable<string> { return this._state.asObservable(); }
  
  public toSetStation(): void { this._state.next("SET_STATION"); }
  public toSetSession(): void { this._state.next("SET_SESSION"); }
}
