import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRequirementComponent } from './hr-requirement.component';

describe('HrRequirementComponent', () => {
  let component: HrRequirementComponent;
  let fixture: ComponentFixture<HrRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
