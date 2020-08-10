import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdDetailDisplayComponent } from './household-detail-display.component';

describe('HouseholdDetailDisplayComponent', () => {
  let component: HouseholdDetailDisplayComponent;
  let fixture: ComponentFixture<HouseholdDetailDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdDetailDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdDetailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
