import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Habitat } from './habitat.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class HabitatService {

  constructor(private client: HttpClient) { }

  public getHabitats(): Observable<Habitat[]> {
    return this.client
      .get(`${environment.api}${environment.habitats}`)
      .pipe(map((data: any) => data as Habitat[]));
  }
}
