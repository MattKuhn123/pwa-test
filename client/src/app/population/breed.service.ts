import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Breed } from './breed.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BreedService {

  constructor(private client: HttpClient) { }

  public getBreeds(): Observable<Breed[]> {
    return this.client
      .get(`${environment.api}${environment.breeds}`)
      .pipe(map((data: any) => data as Breed[]));
  }
}
