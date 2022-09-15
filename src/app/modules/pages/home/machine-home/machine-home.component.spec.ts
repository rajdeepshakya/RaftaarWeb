import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineHomeComponent } from './machine-home.component';

describe('MachineHomeComponent', () => {
  let component: MachineHomeComponent;
  let fixture: ComponentFixture<MachineHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
