import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Species } from './species.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class SpeciesService {

  constructor(private client: HttpClient) { }

  public getSpecies(): Observable<Species[]> {
    return this.client
      .get(`${environment.api}${environment.species}`)
      .pipe(map((data: any) => data as Species[]));
  }
}
