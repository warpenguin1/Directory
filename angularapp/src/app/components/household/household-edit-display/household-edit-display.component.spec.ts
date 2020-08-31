import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdEditDisplayComponent } from './household-edit-display.component';

describe('HouseholdEditDisplayComponent', () => {
  let component: HouseholdEditDisplayComponent;
  let fixture: ComponentFixture<HouseholdEditDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdEditDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdEditDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
