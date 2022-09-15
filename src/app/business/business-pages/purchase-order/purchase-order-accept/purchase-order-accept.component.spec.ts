import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderAcceptComponent } from './purchase-order-accept.component';

describe('PurchaseOrderAcceptComponent', () => {
  let component: PurchaseOrderAcceptComponent;
  let fixture: ComponentFixture<PurchaseOrderAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrderAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
