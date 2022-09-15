import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManufactureProductComponent } from './add-manufacture-product.component';

describe('AddManufactureProductComponent', () => {
  let component: AddManufactureProductComponent;
  let fixture: ComponentFixture<AddManufactureProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManufactureProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManufactureProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
