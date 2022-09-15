import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesDeliveryMilestoneComponent } from './add-sales-delivery-milestone.component';

describe('AddSalesDeliveryMilestoneComponent', () => {
  let component: AddSalesDeliveryMilestoneComponent;
  let fixture: ComponentFixture<AddSalesDeliveryMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesDeliveryMilestoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesDeliveryMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
