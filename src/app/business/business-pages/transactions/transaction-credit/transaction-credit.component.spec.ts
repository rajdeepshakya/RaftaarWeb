import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCreditComponent } from './transaction-credit.component';

describe('TransactionCreditComponent', () => {
  let component: TransactionCreditComponent;
  let fixture: ComponentFixture<TransactionCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
