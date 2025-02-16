import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'src/app/app.component';
import { AppStateService } from 'src/app/app-state.service';
import { SessionSaveService } from 'src/app/session/session-save.service';
import { SessionTypeService } from 'src/app/session-type/session-type.service';
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

const saveStubPartial: Partial<SessionSaveService> = {
  load(key: string): any {
    console.log(key);
  },
  save(key: string, content: any): void {
    console.log(key, content);
  }
}

describe('App', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appStateService: AppStateService;

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

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    appStateService = TestBed.inject(AppStateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-station when the state is "SET_STATION"', () => {
    appStateService.toSetStation();
    fixture.detectChanges();

    const appStation = fixture.debugElement.query(By.css('[data-testid="app-station"]'));
    expect(appStation).toBeTruthy();
    
    const appSession = fixture.debugElement.query(By.css('[data-testid="app-session"]'));
    expect(appSession).toBeFalsy();
  });
  
  it('should render app-session when the state is "SET_SESSION"', () => {
    appStateService.toSetSession();
    fixture.detectChanges();

    const appStation = fixture.debugElement.query(By.css('[data-testid="app-station"]'));
    expect(appStation).toBeFalsy();
    
    const appSession = fixture.debugElement.query(By.css('[data-testid="app-session"]'));
    expect(appSession).toBeTruthy();
  });
});
