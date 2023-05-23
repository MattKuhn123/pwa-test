import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  private _state: BehaviorSubject<string> = new BehaviorSubject('SET_DEPOT');
  public get state(): Observable<string> { return this._state.asObservable(); }
  
  public toSetDepot(): void { this._state.next("SET_DEPOT"); }
  public toSetSetting(): void { this._state.next("SET_SETTING"); }
}
