import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StatationComponent } from './station/station.component';
import { EnvironmentComponent } from './environment/environment.component';
import { OutingComponent } from './outing/outing.component';
import { OutingTypeComponent } from './outing-type/outing-type.component';
import { PopulationComponent } from './population/population.component';
import { StationService } from './station/station.service';
import { BiomeService } from './environment/biome.service';
import { SpeciesService } from './population/species.service';
import { OutingTypeService } from './outing-type/outing-type.service';

import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    StatationComponent,
    OutingComponent,
    OutingTypeComponent,
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
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [
    BiomeService,
    SpeciesService,
    StationService,
    OutingTypeService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
