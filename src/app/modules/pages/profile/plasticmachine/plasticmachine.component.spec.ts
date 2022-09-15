import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlasticmachineComponent } from './plasticmachine.component';

describe('PlasticmachineComponent', () => {
  let component: PlasticmachineComponent;
  let fixture: ComponentFixture<PlasticmachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlasticmachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlasticmachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
