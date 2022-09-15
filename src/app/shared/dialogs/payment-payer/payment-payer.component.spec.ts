import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPayerComponent } from './payment-payer.component';

describe('PaymentPayerComponent', () => {
  let component: PaymentPayerComponent;
  let fixture: ComponentFixture<PaymentPayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
