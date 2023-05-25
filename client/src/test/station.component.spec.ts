import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'src/app/app.component';
import { StatesService } from 'src/app/states.service';
import { SaveService } from 'src/app/save.service';
import { SessionTypeService } from 'src/app/session/session-type.service';
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

describe('Station', () => {
  let component: StationComponent;
  let fixture: ComponentFixture<StationComponent>;

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
        FormBuilder,
        SessionTypeService,
        StationService,
        StatesService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StationComponent);
    component = fixture.componentInstance;

    component.stations = [
      new Station({ id: 'ab123', name: 'Alpha Bravo 123' }),
      new Station({ id: 'cd456', name: 'Charlie Delta 456' }),
      new Station({ id: 'ef789', name: 'Echo Foxtrot 789' }),
    ];

    component.stationGroup = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });

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

  it('should render the stations from input', () => {
    const stationList = fixture.debugElement.query(By.css('[data-testid="station-list"]'));
    expect(stationList).toBeTruthy();

    const stationListItem = fixture.debugElement.queryAll(By.css('[data-testid="station-list-item"]'));
    expect(stationListItem.length).toBe(3);
  });
});
