import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'src/app/app.component';
import { AppStateService } from 'src/app/app-state.service';
import { SessionSaveService } from 'src/app/session/session-save.service';
import { SessionTypeService } from 'src/app/session-type/session-type.service';
import { SessionComponent } from '../app/session/session.component';
import { StationComponent } from '../app/station/station.component';

import { StationService } from 'src/app/station/station.service';
import { SessionService } from 'src/app/session/session.service';

/**
 * The value the save service will return
 */
let load: any = "";
let saveAs: string = "";
let save: string = "";

const saveStubPartial: Partial<SessionSaveService> = {
  load(key: string): any {
    console.log(key);
    return load;
  },
  save(key: string, content: any): void {
    saveAs = key;
    save = JSON.stringify(content);
  }
}

describe('FormGroup', () => {
  let appStateService: AppStateService;
  let sessSvc: SessionService;

  beforeEach(() => {
    load = "";
    saveAs = "";
    save = "";

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ 
        AppComponent,
        SessionComponent,
        StationComponent,
      ],
      providers: [ 
        { provide: SessionSaveService, useValue: saveStubPartial },
        FormBuilder,
        SessionTypeService,
        StationService,
        AppStateService,
      ]
    }).compileComponents();
    appStateService = TestBed.inject(AppStateService);
    sessSvc = TestBed.inject(SessionService);
  });

  it('should create', () => {
    expect(sessSvc).toBeTruthy();
  });

  it('should NOT save if the current state is SET_STATION', () => {
    sessSvc.stationControl.setValue("abc");
    appStateService.toSetStation();

    sessSvc.sessionTypeControl.setValue("something");

    expect(saveAs).toBeFalsy();
  });

  it('should NOT save if the station control is empty', () => {
    sessSvc.stationControl.setValue("");
    appStateService.toSetSession();

    sessSvc.sessionTypeControl.setValue("something");

    expect(saveAs).toBeFalsy();
  });

  it('should save if the station control is NOT empty and the current state is SET_SESSION', () => {
    sessSvc.stationControl.setValue("123");
    appStateService.toSetSession();

    sessSvc.sessionTypeControl.setValue("something");

    expect(saveAs).toBe("123");
    expect(save).toBe(JSON.stringify({"station":"123","sessionType":"something","gillingRuns":[{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}}],"electrocutingRuns":[{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}}]}));
  });

  it('should use whatever the save service brings back whenever the station control value changes', () => {
    // set load to assume what the save service found
    load = {"station":"123","sessionType":"something","gillingRuns":[{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}}],"electrocutingRuns":[{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}}]};
    
    sessSvc.sessionTypeControl.setValue("random value");
    sessSvc.stationControl.setValue("trigger change");

    const actual = JSON.stringify(sessSvc._formGroup.getRawValue());
    const expected = JSON.stringify(load);
    expect(actual).toBe(expected);
  });

  it('should clear out everything except the station control if there is nothing loaded', () => {
    // set load to 'null' to assume the save service found nothing
    load = null;
    
    sessSvc.sessionTypeControl.setValue("random value");
    sessSvc.stationControl.setValue("trigger change");

    const actualStationControl = sessSvc.stationControl.getRawValue();
    expect(actualStationControl).toBe("trigger change");

    const actualSessionTypeControl = sessSvc.sessionTypeControl.getRawValue();
    expect(actualSessionTypeControl).toBeFalsy();
  });
});
