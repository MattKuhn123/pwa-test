import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Station } from './station.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class StationService {

  constructor(private client: HttpClient) { }

  public getStations(): Observable<Station[]> {
    return this.client
      .get(`${environment.api}${environment.stations}`)
      .pipe(map((data: any) => data as Station[]));
  }
}
