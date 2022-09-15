import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostRequirementComponent } from './boost-requirement.component';

describe('BoostRequirementComponent', () => {
  let component: BoostRequirementComponent;
  let fixture: ComponentFixture<BoostRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoostRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoostRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
