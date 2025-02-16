import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'src/app/app.component';
import { AppStateService } from 'src/app/app-state.service';
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
import { SessionService } from 'src/app/session/session.service';
import { SessionSaveService } from 'src/app/session/session-save.service';
import { Habitat } from 'src/app/environment/habitat.model';
import { Species } from 'src/app/population/species.model';
import { EnvironmentComponent } from 'src/app/environment/environment.component';
import { PopulationComponent } from 'src/app/population/population.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const saveStubPartial: Partial<SessionSaveService> = {
  load(key: string): any {
    console.log(key);
  },
  save(key: string, content: any): void {
    console.log(key, content);
  }
}

describe('Session', () => {
  let component: SessionComponent;
  let fixture: ComponentFixture<SessionComponent>;
  let sessSvc: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
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
        EnvironmentComponent,
        PopulationComponent,
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

    fixture = TestBed.createComponent(SessionComponent);
    component = fixture.componentInstance;

    sessSvc = TestBed.inject(SessionService);

    component.habitats = [
      new Habitat({id: "1", name: "brush"}),
      new Habitat({id: "2", name: "swamp"}),
      new Habitat({id: "3", name: "other"}),
    ]

    component.species = [
      new Species({id: "1", name: "Blue Gill"}),
      new Species({id: "2", name: "Yellow Bass"}),
      new Species({id: "3", name: "Green Fin"}),
    ]

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the session types', () => {
    sessSvc.sessionTypeControl.setValue("");
    fixture.detectChanges();

    const stationList = fixture.debugElement.query(By.css('[data-testid="session-type-group"]'));
    expect(stationList).toBeTruthy();

    const stationListItems = fixture.debugElement.queryAll(By.css('[data-testid="session-type-group-item"]'));
    expect(stationListItems.length).toBe(2);
  });

  it('should render nothing if session type is not selected', () => {
    sessSvc.sessionTypeControl.setValue("");
    fixture.detectChanges();

    const appEnvironment = fixture.debugElement.query(By.css('[data-testid="app-environment"]'));
    expect(appEnvironment).toBeFalsy();
    
    const appPopulation = fixture.debugElement.query(By.css('[data-testid="app-population"]'));
    expect(appPopulation).toBeFalsy();
  });
  
  it('should render environment first if session type is selected', () => {
    sessSvc.sessionTypeControl.setValue("1");
    fixture.detectChanges();

    const appEnvironment = fixture.debugElement.query(By.css('[data-testid="app-environment"]'));
    expect(appEnvironment).toBeTruthy();

    const appPopulation = fixture.debugElement.query(By.css('[data-testid="app-population"]'));
    expect(appPopulation).toBeFalsy();
  });
  
  it('should render population if state changes and  session type is selected', () => {
    sessSvc.sessionTypeControl.setValue("1");
    component["state"] = "POPULATION";
    fixture.detectChanges();
    
    const appEnvironment = fixture.debugElement.query(By.css('[data-testid="app-environment"]'));
    expect(appEnvironment).toBeFalsy();

    const appPopulation = fixture.debugElement.query(By.css('[data-testid="app-population"]'));
    expect(appPopulation).toBeTruthy();
  });

  it('should render 15 buttons if selected gilling', () => {
    sessSvc.sessionTypeControl.setValue(sessSvc.gilling.id);
    fixture.detectChanges();

    const idxButtons = fixture.debugElement.queryAll(By.css('[data-testid="idx-buttons"]'));
    expect(idxButtons.length).toBe(15);
  });

  it('should render 12 buttons if selected electrocuting', () => {
    sessSvc.sessionTypeControl.setValue(sessSvc.electrocuting.id);
    fixture.detectChanges();

    const idxButtons = fixture.debugElement.queryAll(By.css('[data-testid="idx-buttons"]'));
    expect(idxButtons.length).toBe(12);
  });
});
