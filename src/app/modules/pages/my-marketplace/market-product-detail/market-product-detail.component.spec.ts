import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketProductDetailComponent } from './market-product-detail.component';

describe('MarketProductDetailComponent', () => {
  let component: MarketProductDetailComponent;
  let fixture: ComponentFixture<MarketProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketProductDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
