import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'src/app/app.component';
import { StateService } from 'src/app/states.service';
import { SaveService } from 'src/app/save.service';
import { SessionTypeService } from 'src/app/session/session-type.service';
import { SessionComponent } from '../app/session/session.component';
import { StationComponent } from '../app/station/station.component';

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

const saveStubPartial: Partial<SaveService> = {
  load(key: string): any { },
  save(key: string, content: any): void { }
}

describe('App', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let saveStub: Partial<SaveService>;
  let stateService: StateService;

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
        { provide: SaveService, useValue: saveStubPartial },
        FormBuilder,
        SessionTypeService,
        StationService,
        StateService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    saveStub = TestBed.inject(SaveService);
    stateService = TestBed.inject(StateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-station when the state is "SET_STATION"', () => {
    stateService.toSetStation();
    fixture.detectChanges();

    const appStation = fixture.debugElement.query(By.css('[data-testid="app-station"]'));
    expect(appStation).toBeTruthy();
    
    const appSession = fixture.debugElement.query(By.css('[data-testid="app-session"]'));
    expect(appSession).toBeFalsy();
  });
  
  it('should render app-session when the state is "SET_SESSION"', () => {
    stateService.toSetSession();
    fixture.detectChanges();

    const appStation = fixture.debugElement.query(By.css('[data-testid="app-station"]'));
    expect(appStation).toBeFalsy();
    
    const appSession = fixture.debugElement.query(By.css('[data-testid="app-session"]'));
    expect(appSession).toBeTruthy();
  });
});
