import { Injectable } from '@angular/core';
import { SessionType } from './session-type.model';

@Injectable()
export class SessionTypeService {
  gilling: SessionType = new SessionType({ id: "1", name: "Gilling" });
  electrocuting: SessionType = new SessionType({ id: "2", name: "Shocking" });

  public get sessionTypes(): SessionType[] {
    return [ this.gilling, this.electrocuting ];
  }

  public get gillingRuns(): number[] { return [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]; }
  public get electrocutingRuns(): number[] { return [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]; }
}
