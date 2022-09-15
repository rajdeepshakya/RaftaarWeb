import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesFilterComponent } from './sales-filter.component';

describe('SalesFilterComponent', () => {
  let component: SalesFilterComponent;
  let fixture: ComponentFixture<SalesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
