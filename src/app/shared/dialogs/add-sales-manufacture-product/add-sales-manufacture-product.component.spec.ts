import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesManufactureProductComponent } from './add-sales-manufacture-product.component';

describe('AddSalesManufactureProductComponent', () => {
  let component: AddSalesManufactureProductComponent;
  let fixture: ComponentFixture<AddSalesManufactureProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesManufactureProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesManufactureProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
