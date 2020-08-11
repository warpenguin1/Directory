import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditDisplayComponent } from './member-edit-display.component';

describe('MemberEditDisplayComponent', () => {
  let component: MemberEditDisplayComponent;
  let fixture: ComponentFixture<MemberEditDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEditDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
