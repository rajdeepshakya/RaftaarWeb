import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketEditProductComponent } from './market-edit-product.component';

describe('MarketEditProductComponent', () => {
  let component: MarketEditProductComponent;
  let fixture: ComponentFixture<MarketEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketEditProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
