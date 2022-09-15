import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingORListComponent } from './manufacturing-o-r-list.component';

describe('ManufacturingORListComponent', () => {
  let component: ManufacturingORListComponent;
  let fixture: ComponentFixture<ManufacturingORListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturingORListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingORListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
