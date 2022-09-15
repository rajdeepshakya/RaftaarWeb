import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrindingMachineComponent } from './grinding-machine.component';

describe('GrindingMachineComponent', () => {
  let component: GrindingMachineComponent;
  let fixture: ComponentFixture<GrindingMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrindingMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrindingMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
