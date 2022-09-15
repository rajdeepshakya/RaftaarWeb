import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeatureProductComponent } from './edit-feature-product.component';

describe('EditFeatureProductComponent', () => {
  let component: EditFeatureProductComponent;
  let fixture: ComponentFixture<EditFeatureProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFeatureProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeatureProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
