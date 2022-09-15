import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSarvaYogaComponent } from './product-sarva-yoga.component';

describe('ProductSarvaYogaComponent', () => {
  let component: ProductSarvaYogaComponent;
  let fixture: ComponentFixture<ProductSarvaYogaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSarvaYogaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSarvaYogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
