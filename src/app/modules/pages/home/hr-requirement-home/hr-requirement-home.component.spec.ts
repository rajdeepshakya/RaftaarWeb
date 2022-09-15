import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRequirementHomeComponent } from './hr-requirement-home.component';

describe('HrRequirementHomeComponent', () => {
  let component: HrRequirementHomeComponent;
  let fixture: ComponentFixture<HrRequirementHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrRequirementHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRequirementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
