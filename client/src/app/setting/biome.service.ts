import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Biome } from './biome.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BiomeService {

  constructor(private client: HttpClient) { }

  public getBiomes(): Observable<Biome[]> {
    return this.client
      .get(`${environment.api}${environment.biomes}`)
      .pipe(map((data: any) => data as Biome[]));
  }
}
