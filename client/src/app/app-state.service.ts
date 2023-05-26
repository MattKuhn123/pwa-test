import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private state$: BehaviorSubject<'SET_STATION' | 'SET_SESSION'> = new BehaviorSubject('SET_STATION' as 'SET_STATION' | 'SET_SESSION');
  public get state(): Observable<'SET_STATION' | 'SET_SESSION'> { return this.state$.asObservable(); }
  
  public toSetStation(): void { this.state$.next("SET_STATION"); }
  public toSetSession(): void { this.state$.next("SET_SESSION"); }
}
