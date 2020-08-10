import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdAddComponent } from './household-add.component';

describe('HouseholdAddComponent', () => {
  let component: HouseholdAddComponent;
  let fixture: ComponentFixture<HouseholdAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
