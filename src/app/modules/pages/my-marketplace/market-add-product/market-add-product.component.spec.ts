import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAddProductComponent } from './market-add-product.component';

describe('MarketAddProductComponent', () => {
  let component: MarketAddProductComponent;
  let fixture: ComponentFixture<MarketAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketAddProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
