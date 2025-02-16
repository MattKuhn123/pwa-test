import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'src/app/app.component';
import { AppStateService } from 'src/app/app-state.service';
import { SessionTypeService } from 'src/app/session-type/session-type.service';
import { SessionComponent } from '../app/session/session.component';
import { StationComponent } from '../app/station/station.component';
import { Station } from '../app/station/station.model';

import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StationService } from 'src/app/station/station.service';
import { SessionService } from 'src/app/session/session.service';
import { SessionSaveService } from 'src/app/session/session-save.service';

const saveStubPartial: Partial<SessionSaveService> = {
  load(key: string): any {
    console.log(key);
  },
  save(key: string, content: any): void {
    console.log(key, content);
  }
}

describe('Station', () => {
  let component: StationComponent;
  let fixture: ComponentFixture<StationComponent>;
  let sessSvc: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,

        MatNativeDateModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatRadioModule,
        MatSelectModule,
        MatToolbarModule
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

    fixture = TestBed.createComponent(StationComponent);
    component = fixture.componentInstance;

    sessSvc = TestBed.inject(SessionService);

    component.stations = [
      new Station({ id: 'ab123', name: 'Alpha Bravo 123' }),
      new Station({ id: 'cd456', name: 'Charlie Delta 456' }),
      new Station({ id: 'ef789', name: 'Echo Foxtrot 789' }),
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the stations from input', () => {
    const stationList = fixture.debugElement.query(By.css('[data-testid="station-list"]'));
    expect(stationList).toBeTruthy();

    const stationListItems = fixture.debugElement.queryAll(By.css('[data-testid="station-list-item"]'));
    expect(stationListItems.length).toBe(3);
  });

  it('should set the form fields when a list item is clicked', () => {
    [0, 1, 2].forEach(idx => {
      const stationListItem = fixture.debugElement.queryAll(By.css('[data-testid="station-list-item"]'))[idx];
      stationListItem.nativeElement.click();
  
      fixture.detectChanges();
  
      const expectedId = component.stations[idx].id;
      const id = sessSvc.stationControl.getRawValue();
      expect(id).toEqual(expectedId);
    })
  });
});
