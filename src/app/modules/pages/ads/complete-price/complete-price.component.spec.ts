import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePriceComponent } from './complete-price.component';

describe('CompletePriceComponent', () => {
  let component: CompletePriceComponent;
  let fixture: ComponentFixture<CompletePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletePriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
