import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineSellComponent } from './machine-sell.component';

describe('MachineSellComponent', () => {
  let component: MachineSellComponent;
  let fixture: ComponentFixture<MachineSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
