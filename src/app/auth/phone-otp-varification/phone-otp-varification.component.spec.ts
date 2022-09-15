import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneOtpVarificationComponent } from './phone-otp-varification.component';

describe('PhoneOtpVarificationComponent', () => {
  let component: PhoneOtpVarificationComponent;
  let fixture: ComponentFixture<PhoneOtpVarificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneOtpVarificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneOtpVarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
