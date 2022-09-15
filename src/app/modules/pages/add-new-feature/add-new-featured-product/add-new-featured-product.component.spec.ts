import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFeaturedProductComponent } from './add-new-featured-product.component';

describe('AddNewFeaturedProductComponent', () => {
  let component: AddNewFeaturedProductComponent;
  let fixture: ComponentFixture<AddNewFeaturedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewFeaturedProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFeaturedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
