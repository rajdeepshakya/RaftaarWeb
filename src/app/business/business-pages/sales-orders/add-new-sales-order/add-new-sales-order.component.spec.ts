import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSalesOrderComponent } from './add-new-sales-order.component';

describe('AddNewSalesOrderComponent', () => {
  let component: AddNewSalesOrderComponent;
  let fixture: ComponentFixture<AddNewSalesOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSalesOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
