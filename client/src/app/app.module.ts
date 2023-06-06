import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppInitComponent } from './app-init.component';
import { EnvironmentComponent } from './environment/environment.component';
import { HabitatService } from './environment/habitat.service';
import { PopulationComponent } from './population/population.component';
import { SessionSaveService } from './session/session-save.service';
import { SessionComponent } from './session/session.component';
import { SessionTypeService } from './session-type/session-type.service';
import { SpeciesService } from './population/species.service';
import { StationComponent } from './station/station.component';
import { StationService } from './station/station.service';

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
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppServiceWorker } from './app-service-worker.service';

@NgModule({
  declarations: [
    AppComponent,
    AppInitComponent,
    StationComponent,
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
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule
  ],
  providers: [
    AppServiceWorker,
    HabitatService,
    SpeciesService,
    StationService,
    SessionSaveService,
    SessionTypeService,
  ],
  bootstrap: [ AppInitComponent ]
})
export class AppModule { }
