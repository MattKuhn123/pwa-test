import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Depot } from './depot.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class DepotService {

  constructor(private client: HttpClient) { }

  public getDepots(): Observable<Depot[]> {
    return this.client
      .get(`${environment.api}${environment.depots}`)
      .pipe(map((data: any) => data as Depot[]));
  }
}
