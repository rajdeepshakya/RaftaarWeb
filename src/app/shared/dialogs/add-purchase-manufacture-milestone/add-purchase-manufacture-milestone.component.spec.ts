import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseManufactureMilestoneComponent } from './add-purchase-manufacture-milestone.component';

describe('AddPurchaseManufactureMilestoneComponent', () => {
  let component: AddPurchaseManufactureMilestoneComponent;
  let fixture: ComponentFixture<AddPurchaseManufactureMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchaseManufactureMilestoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseManufactureMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
