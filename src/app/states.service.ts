import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  public state: BehaviorSubject<string> = new BehaviorSubject('START');
}
