import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'src/app/app.component';
import { StateService } from 'src/app/state.service';
import { SaveService } from 'src/app/save.service';
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

const saveStubPartial: Partial<SaveService> = {
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
  let stateService: StateService;
  let formGroupService: SessionService;

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
        { provide: SaveService, useValue: saveStubPartial },
        FormBuilder,
        SessionTypeService,
        StationService,
        StateService,
      ]
    }).compileComponents();
    stateService = TestBed.inject(StateService);
    formGroupService = TestBed.inject(SessionService);
  });

  it('should create', () => {
    expect(formGroupService).toBeTruthy();
  });

  it('should NOT save if the current state is SET_STATION', () => {
    formGroupService.stationControl.setValue("abc");
    stateService.toSetStation();

    formGroupService.sessionTypeControl.setValue("something");

    expect(saveAs).toBeFalsy();
  });

  it('should NOT save if the station control is empty', () => {
    formGroupService.stationControl.setValue("");
    stateService.toSetSession();

    formGroupService.sessionTypeControl.setValue("something");

    expect(saveAs).toBeFalsy();
  });

  it('should save if the station control is NOT empty and the current state is SET_SESSION', () => {
    formGroupService.stationControl.setValue("123");
    stateService.toSetSession();

    formGroupService.sessionTypeControl.setValue("something");

    expect(saveAs).toBe("123");
    expect(save).toBe(JSON.stringify({"station":"123","sessionType":"something","gillingRuns":[{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}}],"electrocutingRuns":[{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}}]}));
  });

  it('should use whatever the save service brings back whenever the station control value changes', () => {
    // set load to assume what the save service found
    load = {"station":"123","sessionType":"something","gillingRuns":[{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}}],"electrocutingRuns":[{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}},{"population":{"species":null,"count":null},"environment":{"date":null,"leader":null,"habitat":null}}]};
    
    formGroupService.sessionTypeControl.setValue("random value");
    formGroupService.stationControl.setValue("trigger change");

    const actual = JSON.stringify(formGroupService._formGroup.getRawValue());
    const expected = JSON.stringify(load);
    expect(actual).toBe(expected);
  });

  it('should clear out everything except the station control if there is nothing loaded', () => {
    // set load to 'null' to assume the save service found nothing
    load = null;
    
    formGroupService.sessionTypeControl.setValue("random value");
    formGroupService.stationControl.setValue("trigger change");

    const actualStationControl = formGroupService.stationControl.getRawValue();
    expect(actualStationControl).toBe("trigger change");

    const actualSessionTypeControl = formGroupService.sessionTypeControl.getRawValue();
    expect(actualSessionTypeControl).toBeFalsy();
  });
});
