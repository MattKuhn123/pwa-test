import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OutingType } from './outing-type.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class OutingTypeService {

  constructor(private client: HttpClient) { }

  public getOutingTypes(): Observable<OutingType[]> {
    return this.client
      .get(`${environment.api}${environment.outingTypes}`)
      .pipe(map((data: any) => data as OutingType[]));
  }
}
