import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrequirementComponent } from './myrequirement.component';

describe('MyrequirementComponent', () => {
  let component: MyrequirementComponent;
  let fixture: ComponentFixture<MyrequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyrequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyrequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
