import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDebitComponent } from './transaction-debit.component';

describe('TransactionDebitComponent', () => {
  let component: TransactionDebitComponent;
  let fixture: ComponentFixture<TransactionDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionDebitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
