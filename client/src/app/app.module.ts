import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StatationComponent } from './station/station.component';
import { EnvironmentComponent } from './environment/environment.component';
import { SessionComponent } from './session/session.component';
import { PopulationComponent } from './population/population.component';
import { StationService } from './station/station.service';
import { HabitatService } from './environment/habitat.service';
import { SpeciesService } from './population/species.service';
import { SessionTypeService } from './session/session-type.service';

import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SaveService } from './save.service';

@NgModule({
  declarations: [
    AppComponent,
    StatationComponent,
    SessionComponent,
    PopulationComponent,
    EnvironmentComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
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
    MatSelectModule,
    MatToolbarModule
  ],
  providers: [
    HabitatService,
    SpeciesService,
    StationService,
    SaveService,
    SessionTypeService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
