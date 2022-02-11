import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseManagerComponent } from './franchise-manager.component';

describe('FranchiseManagerComponent', () => {
  let component: FranchiseManagerComponent;
  let fixture: ComponentFixture<FranchiseManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranchiseManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
