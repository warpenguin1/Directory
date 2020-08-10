import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdEditComponent } from './household-edit.component';

describe('HouseholdEditComponent', () => {
  let component: HouseholdEditComponent;
  let fixture: ComponentFixture<HouseholdEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
