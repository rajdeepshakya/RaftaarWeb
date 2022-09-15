import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineRequirementComponent } from './machine-requirement.component';

describe('MachineRequirementComponent', () => {
  let component: MachineRequirementComponent;
  let fixture: ComponentFixture<MachineRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
