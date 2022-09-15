import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailAcceptComponent } from './order-detail-accept.component';

describe('OrderDetailAcceptComponent', () => {
  let component: OrderDetailAcceptComponent;
  let fixture: ComponentFixture<OrderDetailAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
