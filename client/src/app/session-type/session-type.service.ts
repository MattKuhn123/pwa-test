import { Injectable } from '@angular/core';
import { SessionType } from './session-type.model';

@Injectable()
export class SessionTypeService {
  GILLING: SessionType = new SessionType({ id: "1", name: "Gilling" });
  ELETROCUTING: SessionType = new SessionType({ id: "2", name: "Shocking" });

  public get sessionTypes(): SessionType[] {
    return [ this.GILLING, this.ELETROCUTING ];
  }
}
