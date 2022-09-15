import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingORHomeComponent } from './manufacturing-o-r-home.component';

describe('ManufacturingORHomeComponent', () => {
  let component: ManufacturingORHomeComponent;
  let fixture: ComponentFixture<ManufacturingORHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturingORHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingORHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
