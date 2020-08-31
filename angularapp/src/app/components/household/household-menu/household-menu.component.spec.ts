import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdMenuComponent } from './household-menu.component';

describe('HouseholdMenuComponent', () => {
  let component: HouseholdMenuComponent;
  let fixture: ComponentFixture<HouseholdMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
