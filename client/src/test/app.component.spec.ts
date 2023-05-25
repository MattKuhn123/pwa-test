import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { StatesService } from 'src/app/states.service';
import { SaveService } from 'src/app/save.service';
import { SessionTypeService } from 'src/app/session/session-type.service';

import { MatToolbarModule } from '@angular/material/toolbar';

describe('PreviousSessionComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let saveStub: Partial<SaveService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
      ],
      declarations: [ AppComponent ],
      providers: [ 
        { provide: SaveService, useValue: saveStub },
        StatesService,
        FormBuilder,
        SessionTypeService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    saveStub = TestBed.inject(SaveService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
