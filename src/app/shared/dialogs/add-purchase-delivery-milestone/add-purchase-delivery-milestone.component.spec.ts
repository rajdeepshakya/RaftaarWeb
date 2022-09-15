import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseDeliveryMilestoneComponent } from './add-purchase-delivery-milestone.component';

describe('AddPurchaseDeliveryMilestoneComponent', () => {
  let component: AddPurchaseDeliveryMilestoneComponent;
  let fixture: ComponentFixture<AddPurchaseDeliveryMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchaseDeliveryMilestoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseDeliveryMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
