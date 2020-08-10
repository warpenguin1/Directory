import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberListDisplayComponent } from './member-list-display.component';

describe('MemberListDisplayComponent', () => {
  let component: MemberListDisplayComponent;
  let fixture: ComponentFixture<MemberListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
