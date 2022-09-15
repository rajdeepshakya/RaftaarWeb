import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingOrderRequirementComponent } from './manufacturing-order-requirement.component';

describe('ManufacturingOrderRequirementComponent', () => {
  let component: ManufacturingOrderRequirementComponent;
  let fixture: ComponentFixture<ManufacturingOrderRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturingOrderRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingOrderRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
