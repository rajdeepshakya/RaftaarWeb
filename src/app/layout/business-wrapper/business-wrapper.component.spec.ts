import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessWrapperComponent } from './business-wrapper.component';

describe('BusinessWrapperComponent', () => {
  let component: BusinessWrapperComponent;
  let fixture: ComponentFixture<BusinessWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
