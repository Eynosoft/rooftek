import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRewardStatusComponent } from './employee-reward-status.component';

describe('EmployeeRewardStatusComponent', () => {
  let component: EmployeeRewardStatusComponent;
  let fixture: ComponentFixture<EmployeeRewardStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRewardStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRewardStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
